import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetPokemonDetailsResponse } from '../interfaces/pokemon-details-response.interface';
import { NotificationService } from './notification.service';

export type Url = string;

export interface GetPokemonListResponse {
  count: number;
  next: Url;
  previous: Url;
  results: PokemonBasicInfo[];
}

export interface PokemonBasicInfo {
  name: string;
  url: Url;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  getPokemonList(): Observable<GetPokemonListResponse> {
    return this.http.get<GetPokemonListResponse>(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20000`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification('There is something wrong with the server, and Pokedéx might not work correctly.');
        throw error;
      })
    );
  }

  getPokemonDetails(url: string): Observable<GetPokemonDetailsResponse> {
    return this.http.get<GetPokemonDetailsResponse>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotification('There is something wrong with the server, and Pokedéx might not work correctly.');
        throw error;
      })
    );
  }

}
