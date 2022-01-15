import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  faCheck,
  faQuestion,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { IScenarioReport } from '../../../shared/public-api';

@Component({
  selector: 'scenarii-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css'],
})
export class ScenarioComponent implements OnChanges {
  @Input()
  public scenario: IScenarioReport | null = null;

  public faCheck = faCheck;
  public faTimes = faTimes;
  public faQuestion = faQuestion;
  public status: 'success' | 'error' | undefined = undefined;

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['scenario'] || !this.scenario) {
      return;
    }

    if (this.scenario.report.valid === undefined) {
      return (this.status = undefined);
    }

    this.status = this.scenario.report.valid ? 'success' : 'error';
  }
}
