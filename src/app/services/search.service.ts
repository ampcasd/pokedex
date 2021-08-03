import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetPokemonDetailsResponse } from '../interfaces/pokemon-details-response.interface';
import { PokemonDetails } from '../store/pokemon.store';

export type Url = string;

export interface GetPokemonListResponse {
  count: number,
  next: Url,
  previous: Url,
  results: PokemonBasicInfo[];
}

export interface PokemonBasicInfo {
  name: string,
  url: Url
}

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {

  constructor(private http: HttpClient) { }

  search(): Observable<GetPokemonListResponse> {
    return this.http.get<GetPokemonListResponse>(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20000`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    )
  }

  getPokemon(url: string): Observable<GetPokemonDetailsResponse> {
    return this.http.get<GetPokemonDetailsResponse>(url).pipe(
      // map((response: GetPokemonDetailsResponse) => normalizePokemonDetails(response)),
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    )
  }

}

// function normalizePokemonDetails(response: GetPokemonDetailsResponse): PokemonDetails {
//   return {
//     id: response.id,
//     abilities: 
//   }
// }
