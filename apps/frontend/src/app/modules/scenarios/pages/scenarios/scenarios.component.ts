import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import {
  IScenario,
  ReportsRegistryService,
  ScenariosRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent {
  public scenarios$: Observable<IScenario[]>;
  public formGroup: FormGroup;

  constructor(
    scenarioRegistry: ScenariosRegistryService,
    private reportRegistry: ReportsRegistryService,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      status: [''],
    });

    this.scenarios$ = combineLatest([
      scenarioRegistry.registryUpdated.pipe(
        startWith(scenarioRegistry.getAll())
      ),
      this.formGroup.valueChanges.pipe(startWith(this.formGroup.value)),
      reportRegistry.registryUpdated.pipe(startWith(reportRegistry.getAll())),
    ]).pipe(
      map(([scenarios, formValue]) => {
        if (formValue.status === '') {
          return scenarios;
        }

        return this.filterScenarios(scenarios, formValue.status);
      })
    );
  }

  private filterScenarios(
    scenarios: IScenario[],
    status: '' | 'success' | 'error' | 'unknown'
  ): IScenario[] {
    return scenarios.filter((s) => this.isScenarioValid(s, status));
  }

  private isScenarioValid(
    scenario: IScenario,
    status: '' | 'success' | 'error' | 'unknown'
  ): boolean {
    const report = this.reportRegistry.get(scenario.id);

    switch (status) {
      case 'success':
        return report?.valid === true;
      case 'error':
        return report?.valid === false;
      case 'unknown':
        return !report;
      default:
        return true;
    }
  }
}
