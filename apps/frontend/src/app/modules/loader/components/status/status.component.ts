import { Component, Output } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { ScenariiRegistryService } from '../../../shared/public-api';

@Component({
  selector: 'scenarii-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  @Output()
  public isRunning: Observable<boolean>;

  constructor(scenariiRegistry: ScenariiRegistryService) {
    this.isRunning = scenariiRegistry.registryUpdated.pipe(
      startWith(scenariiRegistry.getAll()),
      map((registry) => registry.length > 0)
    );
  }
}
