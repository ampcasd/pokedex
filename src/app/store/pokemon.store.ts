import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonDetailsComponent } from '../components/pokemon-details/pokemon-details.component';
import { Pagination } from '../components/pokemon-grid/pokemon-grid.component';
import { DEFAULT_PAGINATION } from '../constants/pagination-default.const';
import { LocalStorageKey } from '../enums/local-storage.enum';
import { GetPokemonDetailsResponse } from '../interfaces/pokemon-details-response.interface';
import { GetPokemonListResponse, PokemonBasicInfo, PokemonSearchService, Url } from '../services/search.service';
import { getFromLocalStorage, updateLocalStorage } from '../utils/local-storage.utils';
import { GetPokemonUrls, SlicePokemon, GetPokemonDetails, FindPokemon, CollectPokemon,
  RemoveFromWishlist, LosePokemon, AddToWishlist, FocusPokemonDetails, GetMultiplePokemonDetails
} from './pokemon.actions';

export type PokemonName = string;

export type PokemonDetails = Partial<GetPokemonDetailsResponse>;

interface PokemonStateModel {
  pokemon: Map<PokemonName, PokemonDetails>;
  pokemonUrls: Map<PokemonName, Url>;
  filteredPokemon: Map<PokemonName, PokemonDetails>;
  filteredPokemonUrls: Map<PokemonName, Url>;
  pagination: Pagination;
  showSpinner: boolean;
  focusedPokemon: PokemonDetails;
  ownedPokemon: Set<PokemonName>;
  wishlistPokemon: Set<PokemonName>;
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    pokemon: new Map(),
    filteredPokemon: new Map(),
    pokemonUrls: new Map(),
    filteredPokemonUrls: new Map(),
    pagination: DEFAULT_PAGINATION,
    showSpinner: true,
    focusedPokemon: null,
    ownedPokemon: new Set(getFromLocalStorage(LocalStorageKey.pokemonCollection) || [] as any),
    wishlistPokemon: new Set(getFromLocalStorage(LocalStorageKey.pokemonWishlist) || [] as any),
  }
})
@Injectable()
export class PokemonState {

  constructor(
    private searchService: PokemonSearchService,
    private dialogService: MatDialog,
  ) {}

  @Action(GetPokemonUrls)
  getPokemonSummary(
    context: StateContext<PokemonStateModel>,
    action: GetPokemonUrls
  ): Observable<GetPokemonListResponse> {

    const state = context.getState();
    const pokemonUrls = new Map();

    return this.searchService.getPokemonList()
      .pipe(
        tap((pokemonListResponse: GetPokemonListResponse) => {

          pokemonListResponse.results.forEach((pokemon: PokemonBasicInfo) => {
            pokemonUrls.set(pokemon.name, pokemon.url);
          });

          context.setState({
            ...state,
            pokemonUrls,
          });

          context.dispatch(new SlicePokemon({
            ...state.pagination,
            length: pokemonUrls.size,
          }));

          context.dispatch(new GetMultiplePokemonDetails(
            [...pokemonUrls.values()].slice(state.pagination.pageIndex, state.pagination.pageSize)
          ));
        })
      );
  }

  @Action(GetPokemonDetails)
  getPokemonDetails(
    context: StateContext<PokemonStateModel>,
    action: GetPokemonDetails
  ): Observable<PokemonDetails> {

    const state = context.getState();

    if (state.pokemon.has(action.pokemonName)) { return; }

    const pokemon = new Map(state.pokemon);

    return this.searchService.getPokemonDetails(action.url)
      .pipe(
        tap((pokemonDetails: PokemonDetails) => {

          pokemon.set(pokemonDetails.name, pokemonDetails);

          context.setState({
            ...state,
            pokemon,
          });
        })
      );
  }

  @Action(GetMultiplePokemonDetails)
  getMultiplePokemonDetails(
    context: StateContext<PokemonStateModel>,
    action: GetMultiplePokemonDetails
  ): Observable<PokemonDetails[]> {

    const state = context.getState();
    const pokemon = new Map(state.pokemon);

    return forkJoin(action.urls.map((url) => this.searchService.getPokemonDetails(url)))
      .pipe(
        tap((pokemonDetails: PokemonDetails[]) => {

          pokemonDetails.forEach((detailedPokemon: PokemonDetails) => {
            pokemon.set(detailedPokemon.name, detailedPokemon);
          });

          context.setState({
            ...state,
            showSpinner: false,
            pokemon,
          });
        })
      );
  }

  @Action(SlicePokemon)
  slicePokemon(
    context: StateContext<PokemonStateModel>,
    action: SlicePokemon
  ): Observable<void> {

    const state = context.getState();
    const pagination = action.pagination || state.pagination;
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = (
      (pagination.pageIndex + 1) * pagination.pageSize ||
      pagination.pageSize
    );

    const filteredPokemonUrls = new Map(
      [...state.pokemonUrls.entries()].slice(startIndex, endIndex)
    );

    context.setState({
      ...state,
      filteredPokemonUrls,
      pagination
    });

    return context.dispatch(new GetMultiplePokemonDetails([...filteredPokemonUrls.values()]));
  }

  @Action(FindPokemon)
  findPokemon(
    context: StateContext<PokemonStateModel>,
    action: FindPokemon
  ): Observable<void> {

    const state = context.getState();

    const filteredPokemonUrls: Array<[PokemonName, Url]> =
      [...state.pokemonUrls.entries()].filter(([name]) => {
        return name.includes(action.searchInput);
      });

    const slicedPokemonMap = new Map(filteredPokemonUrls.slice(0, state.pagination.pageSize));

    context.setState({
      ...state,
      filteredPokemonUrls: slicedPokemonMap,
      pagination: {
        pageIndex: 0,
        pageSize: state.pagination.pageSize,
        length: filteredPokemonUrls.length,
      }
    });

    return context.dispatch(new GetMultiplePokemonDetails([...slicedPokemonMap.values()]));
  }

  @Action(CollectPokemon)
  collectPokemon(
    context: StateContext<PokemonStateModel>,
    action: CollectPokemon
  ): Observable<void> {

    const state = context.getState();
    const ownedPokemon = new Set([...state.ownedPokemon]).add(action.pokemonName);

    context.setState({
      ...state,
      ownedPokemon,
    });

    updateLocalStorage(LocalStorageKey.pokemonCollection, [...ownedPokemon]);

    return context.dispatch(new RemoveFromWishlist(action.pokemonName));
  }

  @Action(LosePokemon)
  losePokemon(
    context: StateContext<PokemonStateModel>,
    action: LosePokemon
  ): void {

    const state = context.getState();
    const ownedPokemon = new Set([...state.ownedPokemon]);

    ownedPokemon.delete(action.pokemonName);

    context.setState({
      ...state,
      ownedPokemon,
    });

    updateLocalStorage(LocalStorageKey.pokemonCollection, [...ownedPokemon]);
  }

  @Action(AddToWishlist)
  addToWishlist(context: StateContext<PokemonStateModel>, action: AddToWishlist
  ): void {

    const state = context.getState();
    const wishlistPokemon = new Set([...state.wishlistPokemon]).add(action.pokemonName);

    context.setState({
      ...state,
      wishlistPokemon,
    });

    updateLocalStorage(LocalStorageKey.pokemonWishlist, [...wishlistPokemon]);
  }

  @Action(RemoveFromWishlist)
  removeFromWishlist(
    context: StateContext<PokemonStateModel>,
    action: RemoveFromWishlist
  ): void {

    const state = context.getState();
    const wishlistPokemon = new Set([...state.wishlistPokemon]);

    wishlistPokemon.delete(action.pokemonName);

    context.setState({
      ...state,
      wishlistPokemon,
    });

    updateLocalStorage(LocalStorageKey.pokemonWishlist, [...wishlistPokemon]);
  }

  @Action(FocusPokemonDetails)
  focusPokemonDetails(
    context: StateContext<PokemonStateModel>,
    action: FocusPokemonDetails
  ): Subscription {

    return context.dispatch(new GetPokemonDetails(action.pokemonName, action.pokemonUrl)).subscribe(() => {

      const state = context.getState();

      this.dialogService.open(PokemonDetailsComponent, {
        data: {
          pokemon: state.pokemon.get(action.pokemonName)
        },
        width: '550px',
      });

    });
  }

}
