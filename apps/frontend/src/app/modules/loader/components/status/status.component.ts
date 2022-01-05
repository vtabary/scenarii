import { Component, Output } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { ScenariosRegistryService } from '../../../shared/public-api';

@Component({
  selector: 'scenarii-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  @Output()
  public isRunning: Observable<boolean>;

  constructor(scenarios: ScenariosRegistryService) {
    this.isRunning = scenarios.registryUpdated.pipe(
      startWith(scenarios.getAll()),
      map((registry) => registry.length > 0)
    );
  }
}
