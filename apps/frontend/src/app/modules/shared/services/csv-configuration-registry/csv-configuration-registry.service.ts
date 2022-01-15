import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataManagerService } from '../data-manager/data-manager.service';

export interface ICSVConfiguration {
  columns: {
    identifier: string;
    message: string;
    category?: string;
    subcategory?: string;
    comment?: string;
    dependency?: string;
    valid?: string;
    testerComment?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CSVConfigurationRegistryService {
  private configuration: ICSVConfiguration = {
    columns: { identifier: 'id', message: 'message' },
  };
  public registryUpdated = new BehaviorSubject<ICSVConfiguration>(
    this.configuration
  );

  constructor(private dataManager: DataManagerService) {}

  /**
   * Get a configuration by its id.
   */
  public get(id: keyof ICSVConfiguration): ICSVConfiguration[typeof id] {
    return this.configuration[id];
  }

  /**
   * Return all the scenarios
   */
  public getAll(): ICSVConfiguration {
    return this.configuration;
  }

  /**
   * Check the data manager to see if there is some scenario data in it
   */
  public load(): boolean {
    const data = this.dataManager.get<ICSVConfiguration>('csv-configuration');
    if (!data) {
      return false;
    }

    this.reset(data);
    return true;
  }

  /**
   * Set a configuration value by its id.
   */
  public set(
    id: keyof ICSVConfiguration,
    value: ICSVConfiguration[typeof id]
  ): void {
    this.configuration[id] = value;
    this.dataManager.set('csv-configuration', this.configuration);
    this.registryUpdated.next(this.getAll());
  }

  /**
   * Clear the registry and set the new configuration.
   */
  public reset(configuration: ICSVConfiguration): void {
    this.configuration = configuration;
    this.dataManager.set('csv-configuration', this.configuration);
    this.registryUpdated.next(this.getAll());
  }

  /**
   * Clear the registry
   */
  public clear(): void {
    this.configuration = {
      columns: {
        identifier: 'id',
        message: 'message',
      },
    };
    this.dataManager.set('csv-configuration', this.configuration);
    this.registryUpdated.next(this.getAll());
  }
}
