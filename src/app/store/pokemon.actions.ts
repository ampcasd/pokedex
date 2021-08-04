import { Pagination } from '../components/pokemon-grid/pokemon-grid.component';

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
  constructor(public pokemonName: string, public url: string) {}
}

export class GetMultiplePokemonDetails {
  static readonly type = '[Pokemon] GetMultiplePokemonDetails';
  constructor(public urls: string[]) {}
}

export class FocusPokemonDetails {
  static readonly type = '[Pokemon] FocusPokemonDetails';
  constructor(public pokemonName: string, public pokemonUrl: string) {}
}

export class CollectPokemon {
  static readonly type = '[Pokemon] CollectPokemon';
  constructor(public pokemonName: string) {}
}

export class LosePokemon {
  static readonly type = '[Pokemon] LosePokemon';
  constructor(public pokemonName: string) {}
}

export class AddToWishlist {
  static readonly type = '[Pokemon] AddToWishlist';
  constructor(public pokemonName: string) {}
}

export class RemoveFromWishlist {
  static readonly type = '[Pokemon] RemoveFromWishlist';
  constructor(public pokemonName: string) {}
}
