import { Component } from '@angular/core';
import {
  ScenariosRegistryService,
  ReportsRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  constructor(
    private scenarios: ScenariosRegistryService,
    private reports: ReportsRegistryService
  ) {}

  public onReset() {
    this.scenarios.reset([]);
    this.reports.reset([]);
  }
}
