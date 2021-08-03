import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Pagination } from "../components/pokemon-grid/pokemon-grid.component";
import { GetPokemonDetailsResponse } from "../interfaces/pokemon-details-response.interface";
import { GetPokemonListResponse, PokemonBasicInfo, PokemonSearchService, Url } from "../services/search.service";

export type PokemonName = string;

export type PokemonDetails = Partial<GetPokemonDetailsResponse>;

interface PokemonStateModel {
  pokemon: Map<PokemonName, PokemonDetails>,
  pokemonUrls: Map<PokemonName, Url>,
  filteredPokemon: Map<PokemonName, PokemonDetails>,
  filteredPokemonUrls: Map<PokemonName, Url>,
  pagination: Pagination,
  focusedPokemon: PokemonDetails,
};

export class GetPokemonUrls {
  static readonly type = '[Pokemon] GetPokemonUrls';
  constructor() {}
}

export class SlicePokemon {
  static readonly type = '[Pokemon] SlicePokemon';
  constructor(public pagination: Pagination) {}
}

export class FindPokemon {
  static readonly type = '[Pokemon] FindPokemon';
  constructor(public searchInput: string) {}
}

export class GetPokemonDetails {
  static readonly type = '[Pokemon] GetPokemonDetails';
  constructor(public url: string) {}
}

export class FocusPokemonDetails {
  static readonly type = '[Pokemon] FocusPokemonDetails';
  constructor(public pokemonName: string, public pokemonUrl: string) {}
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    pokemon: new Map(),
    filteredPokemon: new Map(),
    pokemonUrls: new Map(),
    filteredPokemonUrls: new Map(),
    pagination: {
      pageSize: 10,
      pageIndex: 0,
      length: 100,
    },
    focusedPokemon: null,
  }
})
@Injectable()
export class PokemonState {
  constructor(private searchService: PokemonSearchService) {}

  @Action(GetPokemonUrls)
  getPokemonSummary(context: StateContext<PokemonStateModel>, action: GetPokemonUrls) {
    const state = context.getState();
    let pokemonUrls = new Map();

    this.searchService.search()
      .pipe(
        tap((pokemonListResponse: GetPokemonListResponse) => {
          
          pokemonListResponse.results.forEach((pokemon: PokemonBasicInfo) => {
            pokemonUrls.set(pokemon.name, pokemon.url)
          })

          context.setState({
            ...state,
            pokemonUrls,
          });
          
          context.dispatch(new SlicePokemon({
            ...state.pagination,
            length: pokemonUrls.size,
          }))
          // context.dispatch(new GetPokemonDetails([...pokemonUrls.values()]))
        })
      ).subscribe()
    
  }

  @Action(GetPokemonDetails)
  getPokemonDetails(context: StateContext<PokemonStateModel>, action: GetPokemonDetails) {
    const state = context.getState();
    let pokemon = new Map(state.pokemon);

    return this.searchService.getPokemon(action.url)
      .pipe(
        tap((pokemonDetails: PokemonDetails) => {
          console.log('response', pokemonDetails);
          
          pokemon.set(pokemonDetails.name, pokemonDetails)
          
          context.setState({
            ...state,
            pokemon,
          });
        })
      );
  }

  @Action(SlicePokemon)
  slicePokemon(context: StateContext<PokemonStateModel>, action: SlicePokemon) {
    const state = context.getState();
    const pagination = action.pagination || state.pagination;
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = (
      (pagination.pageIndex + 1) * pagination.pageSize || 
      pagination.pageSize
    );

    let filteredPokemonUrls = new Map(
      [...state.pokemonUrls.entries()].slice(startIndex, endIndex)
    );
    
    context.setState({
      ...state,
      filteredPokemonUrls,
      pagination
    });
  }

  @Action(FindPokemon)
  findPokemon(context: StateContext<PokemonStateModel>, action: FindPokemon) {
    const state = context.getState();

    let filteredPokemonUrls: Array<[PokemonName, Url]> =
      [...state.pokemonUrls.entries()].filter(([name]) => {
        return name.includes(action.searchInput);
      })
    
    context.setState({
      ...state,
      filteredPokemonUrls: new Map(filteredPokemonUrls.slice(0, state.pagination.pageSize)),
      pagination: {
        pageIndex: 0,
        pageSize: state.pagination.pageSize,
        length: filteredPokemonUrls.length,
      }
    });
    
  }

  @Action(FocusPokemonDetails)
  focusPokemonDetails(context: StateContext<PokemonStateModel>, action: FocusPokemonDetails) {
    return context.dispatch(new GetPokemonDetails(action.pokemonUrl)).subscribe(() => {

      const state = context.getState();

      console.log('test', state.pokemon);
      
      context.setState({
        ...state,
        focusedPokemon: state.pokemon.get(action.pokemonName),
      });
    });
    
  }

}
