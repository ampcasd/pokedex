import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { FindPokemon } from 'src/app/store/pokemon.actions';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  value: string;
  inputChanged = new Subject<string>();

  private unsubscribe = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToInputChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private subscribeToInputChanges(): void {
    this.inputChanged.pipe(
      debounceTime(100),
      tap((input: string) => {
        this.store.dispatch(new FindPokemon(input));
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
  }

}
