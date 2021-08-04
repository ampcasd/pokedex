import { Pipe, PipeTransform } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Url } from '../services/search.service';
import { PokemonName } from '../store/pokemon.store';

@Pipe({name: 'buildMap'})
export class PokemonUrlMapPipe implements PipeTransform {

  @Select('pokemon', 'pokemonUrls') pokemonUrls: Observable<Map<PokemonName, Url>>;

  transform(value: Set<PokemonName>, completeMap: Map<PokemonName, Url>): Map<PokemonName, Url> {
    const filteredMap = new Map<PokemonName, Url>();

    [...value].forEach((pokemonName: string) => {
      filteredMap.set(
        pokemonName,
        completeMap.get(pokemonName)
      );
    });

    return filteredMap;
  }
}
