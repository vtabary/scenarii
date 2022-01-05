import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ScenariosRegistryService } from '../../../shared/public-api';
import { IResolvedScenario } from '../../models/scenario';

@Injectable({
  providedIn: 'root',
})
export class ScenarioResolver
  implements Resolve<IResolvedScenario | undefined>
{
  constructor(
    private router: Router,
    private scenarios: ScenariosRegistryService
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<IResolvedScenario | undefined> {
    const scenario = this.scenarios.get(route.params['id']);

    if (!scenario) {
      await this.router.navigateByUrl('/');
      return undefined;
    }

    return {
      ...scenario,
      next: this.scenarios.next(route.params['id']),
      previous: this.scenarios.previous(route.params['id']),
      length: this.scenarios.length,
    };
  }
}
