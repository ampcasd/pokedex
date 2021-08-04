import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { CollectPokemon, LosePokemon, AddToWishlist, RemoveFromWishlist } from 'src/app/store/pokemon.actions';
import { PokemonDetails, PokemonName } from 'src/app/store/pokemon.store';


export interface PokemonDetailsModalConfiguration {
  pokemon: PokemonDetails;
}

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  @Select('pokemon', 'ownedPokemon') ownedPokemon: Observable<Set<PokemonName>>;
  @Select('pokemon', 'wishlistPokemon') wishlistPokemon: Observable<Set<PokemonName>>;

  isOwned: boolean;
  isWished: boolean;

  private unsubscribe = new Subject();

  get breakStatistics(): boolean {
    return this.data.pokemon.stats.length > 24;
  }

  get statisticsColumns(): number {
    return this.breakStatistics ? Math.round(this.data.pokemon.stats.length / 6) : 4;
  }

  get breakMoves(): boolean {
    return this.data.pokemon.moves.length > 24;
  }

  get movesColumns(): number {
    return this.breakMoves ? Math.round(this.data.pokemon.moves.length / 6) : 4;
  }

  get ownershipTooltip(): string {
    return this.isOwned ? 'Remove from Collection' : 'Add to Collection';
  }

  get wishlistTooltip(): string {
    if (this.isOwned) {
      return 'You already own it!';
    }
    return this.isWished ? 'Remove from Wishlist' : 'Add to Wishlist';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PokemonDetailsModalConfiguration,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.subscribeToStore();
  }

  toggleOwnership(): void {
    if (this.isOwned) {
      this.removeFromCollection();
    } else {
      this.saveToCollection();
    }
  }

  toggleWish(): void {
    if (!this.isOwned) {
      if (this.isWished) {
        this.removeFromWishlist();
      } else {
        this.addToWishlist();
      }
    }
  }

  private saveToCollection(): void {
    this.store.dispatch(new CollectPokemon(this.data.pokemon.name));
  }

  private removeFromCollection(): void {
    this.store.dispatch(new LosePokemon(this.data.pokemon.name));
  }

  private addToWishlist(): void {
    this.store.dispatch(new AddToWishlist(this.data.pokemon.name));
  }

  private removeFromWishlist(): void {
    this.store.dispatch(new RemoveFromWishlist(this.data.pokemon.name));
  }

  private subscribeToStore(): void {
    combineLatest([
      this.ownedPokemon,
      this.wishlistPokemon,
    ]).pipe(
      takeUntil(this.unsubscribe),
      delay(35),
      tap(([owned, wishlist]) => {
        this.isOwned = owned.has(this.data.pokemon.name);
        this.isWished = wishlist.has(this.data.pokemon.name);
      })
    ).subscribe();
  }

}
