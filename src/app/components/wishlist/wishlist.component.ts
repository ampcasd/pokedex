import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Url } from 'src/app/services/search.service';
import { PokemonName } from 'src/app/store/pokemon.store';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  @Select('pokemon', 'wishlistPokemon') pokemon: Observable<Set<PokemonName>>;
  @Select('pokemon', 'pokemonUrls') pokemonUrls: Observable<Map<PokemonName, Url>>;

}
