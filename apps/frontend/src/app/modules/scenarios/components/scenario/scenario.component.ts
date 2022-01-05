import { Component, Input } from '@angular/core';
import { IScenario } from '../../../shared/public-api';

@Component({
  selector: 'scenarii-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css'],
})
export class ScenarioComponent {
  @Input()
  public scenario: IScenario | null = null;
}
