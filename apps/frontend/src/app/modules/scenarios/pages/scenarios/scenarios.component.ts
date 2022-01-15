import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import {
  IScenarioReport,
  ScenariosRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent {
  public scenarios$: Observable<IScenarioReport[]>;
  public formGroup: FormGroup;

  constructor(
    scenarioRegistry: ScenariosRegistryService,
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
    scenarios: IScenarioReport[],
    status: '' | 'success' | 'error' | 'unknown'
  ): IScenarioReport[] {
    return scenarios.filter((s) => this.isScenarioValid(s, status));
  }

  private isScenarioValid(
    scenario: IScenarioReport,
    status: '' | 'success' | 'error' | 'unknown'
  ): boolean {
    switch (status) {
      case 'success':
        return scenario.report.valid === true;
      case 'error':
        return scenario.report.valid === false;
      case 'unknown':
        return scenario.report.valid === undefined;
      default:
        return true;
    }
  }
}
