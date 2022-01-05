import { Component } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import {
  IScenario,
  ScenariosRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent {
  public scenarios$: Observable<IScenario[]>;

  constructor(scenarios: ScenariosRegistryService) {
    this.scenarios$ = scenarios.registryUpdated.pipe(
      startWith(scenarios.getAll())
    );
  }
}
