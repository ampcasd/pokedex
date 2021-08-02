import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  value: string;
  inputChanged = new Subject<string>();

  private unsubscribe = new Subject<void>();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.subscribeToInputChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private subscribeToInputChanges(): void {
    this.inputChanged.pipe(
      debounceTime(500),
      tap((input: string) => {
        this.searchService.search(input);
      }),
      takeUntil(this.unsubscribe)
    ).subscribe()
  }
}
