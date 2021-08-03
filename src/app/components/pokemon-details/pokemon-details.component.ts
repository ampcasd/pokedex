import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PokemonDetails } from 'src/app/store/pokemon.store';


export interface PokemonDetailsModalConfiguration {
  url: string;
}

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  @Select('pokemon', 'focusedPokemon') pokemon: Observable<PokemonDetails>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PokemonDetailsModalConfiguration
    // store: Store,
  ) {
    // store.dispatch()
  }

  ngOnInit(): void {
  }

}
