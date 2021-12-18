import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ScenariiRegistryService } from '../../../shared/public-api';
import { IResolvedScenario } from '../../models/scenario';

@Injectable({
  providedIn: 'root',
})
export class ScenarioResolver
  implements Resolve<IResolvedScenario | undefined>
{
  constructor(
    private router: Router,
    private scenariiRegistry: ScenariiRegistryService
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<IResolvedScenario | undefined> {
    const scenario = this.scenariiRegistry.get(route.params['id']);

    if (!scenario) {
      await this.router.navigateByUrl('/');
      return undefined;
    }

    return {
      ...scenario,
      next: this.scenariiRegistry.next(route.params['id']),
      previous: this.scenariiRegistry.previous(route.params['id']),
      length: this.scenariiRegistry.length,
    };
  }
}
