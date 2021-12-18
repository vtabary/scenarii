import { TestBed } from '@angular/core/testing';

import { CSVParserService } from './csvparser.service';

describe('CSVParserService', () => {
  let service: CSVParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
