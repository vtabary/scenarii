import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import {
  ReportsRegistryService,
  ScenariiRegistryService,
} from '../../../shared/public-api';
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
    private scenariiRegistry: ScenariiRegistryService,
    private reportsRegistry: ReportsRegistryService,
    private router: Router
  ) {
    this.scenario$ = this.activatedRoute.data.pipe(
      map((data) => {
        const scenario = (data as { scenario: IResolvedScenario }).scenario;
        this.scenario = scenario;
        return scenario;
      })
    );

    this.length = this.scenariiRegistry.length;
  }

  public onValidate(): void {
    if (!this.scenario?.id) {
      return;
    }

    this.reportsRegistry.set({
      scenarioId: this.scenario.id,
      comment: '',
      valid: true,
    });

    this.goToNextPage();
  }

  public onFail(): void {
    if (!this.scenario?.id) {
      return;
    }

    this.reportsRegistry.set({
      scenarioId: this.scenario.id,
      comment: '',
      valid: false,
    });

    this.goToNextPage();
  }

  private goToNextPage(): void {
    if (this.scenario?.next?.id) {
      this.router.navigate(['/run', this.scenario.next?.id]);
      return;
    }

    this.router.navigateByUrl('/run/done');
  }
}
