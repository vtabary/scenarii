import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  ScenariosRegistryService,
  CSVConfigurationRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  public faTrash = faTrash;

  constructor(
    private scenarios: ScenariosRegistryService,
    private configuration: CSVConfigurationRegistryService
  ) {}

  public onReset() {
    this.scenarios.reset([]);
    this.configuration.clear();
  }
}
