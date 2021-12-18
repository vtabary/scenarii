import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ScenariiRegistryService } from '../../../shared/public-api';

@Injectable({
  providedIn: 'root',
})
export class CurrentScenarioResolver implements Resolve<void> {
  constructor(
    private router: Router,
    private scenariiRegistry: ScenariiRegistryService
  ) {}

  public async resolve(): Promise<void> {
    const scenario = this.scenariiRegistry.getAll()[0];
    this.router.navigateByUrl(`/run/${scenario.id}`);
  }
}
