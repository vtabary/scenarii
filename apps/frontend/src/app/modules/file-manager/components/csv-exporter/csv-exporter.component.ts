import { Component } from '@angular/core';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs';
import {
  ScenarioConverterService,
  ScenariosRegistryService,
} from '../../../shared/public-api';
import { CSVBuilderService } from '../../services/csv-builder/csv-builder.service';
import { FileSaverService } from '../../services/file-saver/file-saver.service';

@Component({
  selector: 'scenarii-csv-exporter',
  templateUrl: './csv-exporter.component.html',
  styleUrls: ['./csv-exporter.component.css'],
})
export class CSVExporterComponent {
  public faFileExport = faFileExport;

  constructor(
    private builder: CSVBuilderService,
    private scenarios: ScenariosRegistryService,
    private scenarioConverter: ScenarioConverterService,
    private fileSaver: FileSaverService
  ) {}

  public onExport() {
    const data = this.scenarioConverter.scenariosToCSV(this.scenarios.getAll());
    console.log('content', data);
    this.builder
      .build(data)
      .pipe(
        switchMap((content) => this.fileSaver.saveText(content, 'report.csv'))
      )
      .subscribe();
  }
}
