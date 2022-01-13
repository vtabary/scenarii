import { Injectable } from '@angular/core';
import { IScenario } from '../../public-api';
import {
  CSVConfigurationRegistryService,
  ICSVConfiguration,
} from '../csv-configuration-registry/csv-configuration-registry.service';

@Injectable({
  providedIn: 'root',
})
export class ScenarioConverterService {
  constructor(private csvConfiguration: CSVConfigurationRegistryService) {}

  public convertToScenarios(
    csvContent: { [key: string]: string | number }[]
  ): IScenario[] {
    const configuration = this.getConfiguration();

    return csvContent.map((row) => {
      return this.convertToScenario(row, configuration);
    });
  }

  private getConfiguration(): ICSVConfiguration['columns'] {
    return this.csvConfiguration.get('columns');
  }

  private convertToScenario(
    row: { [key: string]: string | number },
    columns: ICSVConfiguration['columns']
  ): IScenario {
    return {
      id: this.getFieldValue(row, columns.identifier),
      message: this.getFieldValue(row, columns.message),
      category: this.getFieldValue(row, columns.category),
      comment: this.getFieldValue(row, columns.subcategory),
      dependency: this.getFieldValue(row, columns.dependency),
      subcategory: this.getFieldValue(row, columns.subcategory),
    };
  }

  private getFieldValue(
    row: { [key: string]: string | number },
    fieldName: string | undefined
  ): string {
    return fieldName ? `${row[fieldName]}` : '';
  }
}
