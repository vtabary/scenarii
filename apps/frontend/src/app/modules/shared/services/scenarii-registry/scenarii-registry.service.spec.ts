import { TestBed } from '@angular/core/testing';

import { ScenariiRegistryService } from './scenarii-registry.service';

describe('ScenariiRegistryService', () => {
  let service: ScenariiRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenariiRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
