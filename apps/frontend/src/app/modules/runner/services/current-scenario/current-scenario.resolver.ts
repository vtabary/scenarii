import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ScenariosRegistryService } from '../../../shared/public-api';

@Injectable({
  providedIn: 'root',
})
export class CurrentScenarioResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private scenarios: ScenariosRegistryService
  ) {}

  public resolve(): Promise<boolean> {
    const scenarios = this.scenarios.getAll();
    const nextScenario = scenarios.find(
      (item) => item.report.valid === undefined
    );

    if (nextScenario) {
      return this.router.navigateByUrl(`/run/${nextScenario.scenario.id}`);
    }

    return this.router.navigateByUrl('/run/done');
  }
}
