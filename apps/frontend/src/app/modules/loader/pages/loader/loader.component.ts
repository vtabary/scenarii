import { Component } from '@angular/core';
import {
  IScenario,
  ScenariosRegistryService,
  ICSVConfiguration,
  CSVConfigurationRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  public currentFile: { [key: string]: string | number }[] | null = null;

  public isRunning = false;

  constructor(
    private scenarios: ScenariosRegistryService,
    private csvConfiguration: CSVConfigurationRegistryService
  ) {
    this.isRunning = this.scenarios.getAll().length > 0;
  }

  public onScenarios(scenarios: IScenario[]) {
    this.currentFile = null;
    this.scenarios.reset(scenarios);
    this.isRunning = true;
  }

  public onConfigurationUpdated(configuration: ICSVConfiguration) {
    this.csvConfiguration.reset(configuration);
  }

  public onClear() {
    this.currentFile = null;
  }
}
