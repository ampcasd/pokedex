import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Url } from 'src/app/services/search.service';
import { PokemonName } from 'src/app/store/pokemon.store';
import { Pagination } from '../pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  @Select('pokemon', 'filteredPokemonUrls') filteredPokemon: Observable<Map<PokemonName, Url>>;
  @Select('pokemon', 'pagination') pagination: Observable<Pagination>;
  @Select('pokemon', 'showSpinner') showSpinner: Observable<boolean>;

}
