import { TestBed } from '@angular/core/testing';

import { CSVBuilderService } from './csv-builder.service';

describe('CSVBuilderService', () => {
  let service: CSVBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
