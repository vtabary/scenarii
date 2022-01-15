import { Injectable } from '@angular/core';
import {
  CSVConfigurationRegistryService,
  ICSVConfiguration,
} from '../csv-configuration-registry/csv-configuration-registry.service';
import { IScenarioReport } from '../scenarios-registry/scenarios-registry.service';

@Injectable({
  providedIn: 'root',
})
export class ScenarioConverterService {
  constructor(private csvConfiguration: CSVConfigurationRegistryService) {}

  public csvToScenarios(
    csvContent: { [key: string]: string }[]
  ): IScenarioReport[] {
    const configuration = this.getConfiguration();

    return csvContent.map((row) => {
      return this.csvToScenario(row, configuration);
    });
  }

  public scenariosToCSV(
    scenarios: IScenarioReport[]
  ): { [key: string]: string }[] {
    const configuration = this.getConfiguration();

    return scenarios.map((row) => {
      return this.scenarioToCSV(row, configuration);
    });
  }

  private scenarioToCSV(
    item: IScenarioReport,
    columns: ICSVConfiguration['columns']
  ): { [key: string]: string } {
    return {
      [columns.identifier]: item.scenario.id,
      [columns.message]: item.scenario.message,
      [columns.category || 'category']: item.scenario.category || '',
      [columns.subcategory || 'subcategory']: item.scenario.subcategory || '',
      [columns.comment || 'comment']: item.scenario.comment || '',
      [columns.dependency || 'dependency']: item.scenario.dependency || '',
      [columns.valid || 'valid']:
        item.report.valid === undefined
          ? ''
          : item.report.valid
          ? 'true'
          : 'false',
      [columns.testerComment || 'testerComment']: item.report.comment || '',
    };
  }

  private csvToScenario(
    row: { [key: string]: string },
    columns: ICSVConfiguration['columns']
  ): IScenarioReport {
    const statuses: { [key: string]: boolean | undefined } = {
      true: true,
      false: false,
      unknown: undefined,
    };

    return {
      scenario: {
        id: this.getFieldValue(row, columns.identifier),
        message: this.getFieldValue(row, columns.message),
        category: this.getFieldValue(row, columns.category),
        comment: this.getFieldValue(row, columns.comment),
        dependency: this.getFieldValue(row, columns.dependency),
        subcategory: this.getFieldValue(row, columns.subcategory),
      },
      report: {
        comment: null,
        valid: statuses[this.getFieldValue(row, columns.valid, 'unknown')],
      },
    };
  }

  private getFieldValue(
    row: { [key: string]: string },
    fieldName: string | undefined,
    defaultValue = ''
  ): string {
    return fieldName ? `${row[fieldName]}` : defaultValue;
  }

  private getConfiguration(): ICSVConfiguration['columns'] {
    return this.csvConfiguration.get('columns');
  }
}
