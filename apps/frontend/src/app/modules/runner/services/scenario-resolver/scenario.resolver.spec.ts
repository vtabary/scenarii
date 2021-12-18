import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ScenarioResolver } from './scenario.resolver';

describe('ScenarioResolver', () => {
  let resolver: ScenarioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    resolver = TestBed.inject(ScenarioResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
