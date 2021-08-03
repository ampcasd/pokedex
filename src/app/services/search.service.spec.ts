import { TestBed } from '@angular/core/testing';

import { PokemonSearchService } from './search.service';

describe('SearchService', () => {
  let service: PokemonSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
