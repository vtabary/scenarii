import { TestBed } from '@angular/core/testing';

import { ScenarioConverterService } from './scenario-converter.service';

describe('ScenarioConverterService', () => {
  let service: ScenarioConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
