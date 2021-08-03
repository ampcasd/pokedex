import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Url } from 'src/app/services/search.service';
import { SlicePokemon, PokemonName } from 'src/app/store/pokemon.store';

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
export class PokemonGridComponent implements OnInit {
  
  @Input() pokemon: Map<string, Url>;
  @Input() filteredPokemon: Map<string, Url>;
  @Input() pagination: Pagination

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  paginate(event: any) {
    this.store.dispatch(new SlicePokemon(event));
  }
}
