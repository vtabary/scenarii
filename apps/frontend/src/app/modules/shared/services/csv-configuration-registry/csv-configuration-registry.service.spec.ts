import { TestBed } from '@angular/core/testing';

import { CSVConfigurationRegistryService } from './csv-configuration-registry.service';

describe('CSVConfigurationRegistryService', () => {
  let service: CSVConfigurationRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVConfigurationRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
