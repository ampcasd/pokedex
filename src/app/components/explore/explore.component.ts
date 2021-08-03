import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Url } from 'src/app/services/search.service';
import { GetPokemonUrls, PokemonName } from 'src/app/store/pokemon.store';
import { Pagination } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  
  @Select('pokemon', 'pokemonUrls') pokemon: Observable<Map<PokemonName, Url>>;
  @Select('pokemon', 'filteredPokemonUrls') filteredPokemon: Observable<Map<PokemonName, Url>>;
  @Select('pokemon', 'pagination') pagination: Observable<Map<PokemonName, Pagination>>;

  constructor(store: Store) {
    store.dispatch(new GetPokemonUrls())
  }

  ngOnInit(): void {
  }

}
