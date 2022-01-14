import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  faCheck,
  faQuestion,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { IScenario, ReportsRegistryService } from '../../../shared/public-api';

@Component({
  selector: 'scenarii-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css'],
})
export class ScenarioComponent implements OnChanges {
  @Input()
  public scenario: IScenario | null = null;

  public faCheck = faCheck;
  public faTimes = faTimes;
  public faQuestion = faQuestion;
  public status: 'success' | 'error' | undefined = undefined;

  constructor(private reports: ReportsRegistryService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['scenario'] || !this.scenario) {
      return;
    }

    const report = this.reports.get(this.scenario.id);
    if (!report) {
      return (this.status = undefined);
    }

    this.status = report.valid ? 'success' : 'error';
  }
}
