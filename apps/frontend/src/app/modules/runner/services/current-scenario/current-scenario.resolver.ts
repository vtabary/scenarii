import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ScenariosRegistryService } from '../../../shared/public-api';

@Injectable({
  providedIn: 'root',
})
export class CurrentScenarioResolver implements Resolve<void> {
  constructor(
    private router: Router,
    private scenarios: ScenariosRegistryService
  ) {}

  public async resolve(): Promise<void> {
    const scenario = this.scenarios.getAll()[0];
    this.router.navigateByUrl(`/run/${scenario.id}`);
  }
}
