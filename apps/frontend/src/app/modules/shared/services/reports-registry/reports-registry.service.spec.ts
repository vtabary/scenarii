import { TestBed } from '@angular/core/testing';

import { ReportsRegistryService } from './reports-registry.service';

describe('ReportsRegistryService', () => {
  let service: ReportsRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
