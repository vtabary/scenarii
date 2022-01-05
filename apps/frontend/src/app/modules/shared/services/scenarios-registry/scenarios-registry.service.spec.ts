import { TestBed } from '@angular/core/testing';

import { ScenariosRegistryService } from './scenarios-registry.service';

describe('ScenariosRegistryService', () => {
  let service: ScenariosRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenariosRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
