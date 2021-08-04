import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Url } from 'src/app/services/search.service';
import { SlicePokemon } from 'src/app/store/pokemon.actions';

export interface Pagination {
  pageSize: number;
  length: number;
  pageIndex: number;
}

@Component({
  selector: 'pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.scss']
})
export class PokemonGridComponent {

  @Input() pokemon: Map<string, Url>;
  @Input() pagination: Pagination;
  @Input() showSpinner: boolean;

  constructor(private store: Store) { }

  paginate(event: any): void {
    this.store.dispatch(new SlicePokemon(event));
  }
}
