import { Component } from '@angular/core';
import {
  ScenariiRegistryService,
  ReportsRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  constructor(
    private scenariiRegistry: ScenariiRegistryService,
    private reportsScenarii: ReportsRegistryService
  ) {}

  public onReset() {
    this.scenariiRegistry.reset([]);
    this.reportsScenarii.reset([]);
  }
}
