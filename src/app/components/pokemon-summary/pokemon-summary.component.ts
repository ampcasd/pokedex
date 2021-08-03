import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Url } from 'src/app/services/search.service';
import { FocusPokemonDetails, GetPokemonDetails } from 'src/app/store/pokemon.store';
import { PokemonDetailsComponent, PokemonDetailsModalConfiguration } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.scss']
})
export class PokemonSummaryComponent implements OnInit {

  @Input() pokemonName: string;
  @Input() pokemonUrl: string;

  constructor(
    private dialogService: MatDialog, 
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  openDetails(url: Url): void {
    this.store.dispatch(new FocusPokemonDetails(this.pokemonName, this.pokemonUrl))
    
    const data: PokemonDetailsModalConfiguration = {
      url
    }
    this.dialogService.open(PokemonDetailsComponent, { data })
  }

}
