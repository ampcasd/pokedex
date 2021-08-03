import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { PokemonBasicInfo, PokemonSearchService } from 'src/app/services/search.service';
import { FindPokemon } from 'src/app/store/pokemon.store';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  value: string;
  options: PokemonBasicInfo[];
  inputChanged = new Subject<string>();

  private unsubscribe = new Subject<void>();

  constructor(private searchService: PokemonSearchService, private store: Store) { }

  ngOnInit(): void {
    this.subscribeToInputChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private subscribeToInputChanges(): void {
    this.inputChanged.pipe(
      debounceTime(10),
      tap((input: string) => {
        this.store.dispatch(new FindPokemon(input))
      }),
      takeUntil(this.unsubscribe)
    ).subscribe()
  }

}
