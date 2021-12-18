import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CurrentScenarioResolver } from './current-scenario.resolver';

describe('CurrentScenarioResolver', () => {
  let resolver: CurrentScenarioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    resolver = TestBed.inject(CurrentScenarioResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
