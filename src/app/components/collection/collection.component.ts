import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Url } from 'src/app/services/search.service';
import { PokemonName } from 'src/app/store/pokemon.store';
import { Pagination } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {

  @Select('pokemon', 'ownedPokemon') pokemon: Observable<Set<PokemonName>>;
  @Select('pokemon', 'pokemonUrls') pokemonUrls: Observable<Map<PokemonName, Url>>;

}
