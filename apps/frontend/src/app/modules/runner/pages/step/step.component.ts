import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ScenariosRegistryService } from '../../../shared/public-api';
import { IResolvedScenario } from '../../models/scenario';

@Component({
  selector: 'scenarii-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
})
export class StepComponent {
  public scenario$: Observable<IResolvedScenario>;

  public length = 0;
  private scenario?: IResolvedScenario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scenarios: ScenariosRegistryService,
    private router: Router
  ) {
    this.scenario$ = this.activatedRoute.data.pipe(
      map((data) => {
        const scenario = (data as { scenario: IResolvedScenario }).scenario;
        this.scenario = scenario;
        return scenario;
      })
    );

    this.length = this.scenarios.length;
  }

  public onValidate(): void {
    if (!this.scenario?.scenario.id) {
      return;
    }

    this.scenario.report.valid = true;
    this.scenarios.set(this.scenario);

    this.goToNextPage();
  }

  public onFail(): void {
    if (!this.scenario?.scenario.id) {
      return;
    }

    this.scenario.report.valid = false;
    this.scenarios.set(this.scenario);

    this.goToNextPage();
  }

  private goToNextPage(): void {
    if (this.scenario?.next?.scenario.id) {
      this.router.navigate(['/run', this.scenario.next?.scenario.id]);
      return;
    }

    this.router.navigateByUrl('/run/done');
  }
}
