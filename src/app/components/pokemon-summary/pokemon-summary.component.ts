import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FocusPokemonDetails } from 'src/app/store/pokemon.actions';
import { PokemonDetails, PokemonName } from 'src/app/store/pokemon.store';

@Component({
  selector: 'pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.scss']
})
export class PokemonSummaryComponent {

  @Select('pokemon', 'pokemon') pokemonDetails: Observable<Map<PokemonName, PokemonDetails>>;

  @Input() pokemonName: string;
  @Input() pokemonUrl: string;

  constructor(
    private store: Store
  ) { }

  openDetails(): void {
    this.store.dispatch(new FocusPokemonDetails(this.pokemonName, this.pokemonUrl));
  }

}
