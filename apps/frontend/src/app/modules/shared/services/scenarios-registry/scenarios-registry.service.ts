import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IScenario } from '../../models/scenario';
import { IReport } from '../../public-api';
import { DataManagerService } from '../data-manager/data-manager.service';

export type IScenarioReport = {
  scenario: IScenario;
  report: IReport;
};

@Injectable({
  providedIn: 'root',
})
export class ScenariosRegistryService {
  public registryUpdated = new BehaviorSubject<IScenarioReport[]>([]);
  private items: IScenarioReport[] = [];
  private itemByIds: Map<string, IScenarioReport> = new Map();

  constructor(private dataManager: DataManagerService) {}

  /**
   * Get a scenario by its id.
   */
  public get(id: string):
    | (IScenarioReport & {
        index: number;
      })
    | undefined {
    const scenario = this.itemByIds.get(id);
    if (!scenario) {
      return undefined;
    }

    return {
      ...scenario,
      index: this.items.indexOf(scenario),
    };
  }

  /**
   * Return all the scenarios
   */
  public getAll(): IScenarioReport[] {
    return [...this.items];
  }

  /**
   * Return all the scenarios by category
   */
  public getAllByCategories(): { [category: string]: IScenarioReport[] } {
    return this.items.reduce((acc, item) => {
      acc[item.scenario.category || ''] =
        acc[item.scenario.category || ''] || [];
      acc[item.scenario.category || ''].push(item);
      return acc;
    }, {} as { [category: string]: IScenarioReport[] });
  }

  /**
   * Check the data manager to see if there is some scenario data in it
   */
  public load(): boolean {
    const data = this.dataManager.get<IScenarioReport[]>('scenarios');
    if (!data || data.length === 0) {
      return false;
    }

    this.reset(data);
    return true;
  }

  /**
   * Update a single scenario
   */
  public set(scenario: IScenarioReport): void {
    if (this.itemByIds.has(scenario.scenario.id)) {
      this.itemByIds.set(scenario.scenario.id, scenario);
      this.items[this.items.indexOf(scenario)] = scenario;
    } else {
      this.addItem(scenario);
    }

    this.save();
  }

  /**
   * Remove a scenario
   */
  public delete(id: string): void {
    if (this.itemByIds.has(id)) {
      return;
    }

    this.items = this.items.splice(
      this.items.findIndex((item) => item.scenario.id === id),
      1
    );

    this.itemByIds.delete(id);
    this.save();
  }

  /**
   * Clear the registry and set the new scenarios.
   */
  public reset(scenarios: IScenarioReport[]): void {
    this.items = [];
    this.itemByIds.clear();
    this.addItems(scenarios);

    this.save();
  }

  /**
   * Clear the registry and set the new scenarios.
   */
  public save(): void {
    this.dataManager.set('scenarios', this.items);
    this.registryUpdated.next(this.getAll());
  }

  /**
   * Get the next scenario from the given scenario, or undefined if none is existing
   */
  public next(id: string):
    | (IScenarioReport & {
        index: number;
      })
    | undefined {
    const scenario = this.get(id);

    if (!scenario) {
      return undefined;
    }

    return this.get(this.items[scenario.index + 1]?.scenario.id);
  }

  /**
   * Get the previous scenario from the given scenario, or undefined if none is existing
   */
  public previous(id: string):
    | (IScenarioReport & {
        index: number;
      })
    | undefined {
    const scenario = this.get(id);

    if (!scenario) {
      return undefined;
    }

    return this.get(this.items[scenario.index - 1]?.scenario.id);
  }

  /**
   * Get the number of scenarios in the registry
   */
  public get length(): number {
    return this.items.length;
  }

  private addItems(scenarios: IScenarioReport[]): void {
    scenarios.forEach((scenario) => this.addItem(scenario));
  }

  private addItem(item: IScenarioReport): void {
    if (!item.scenario.id) {
      return;
    }

    // Force the category, the subcategory and the comment to be string or null
    item.scenario = Object.assign(
      { category: null, subcategory: null, comment: null },
      item.scenario
    );
    item.report = {
      valid: item.report.valid,
      comment: item.report.comment,
    };
    this.items.push(item);
    this.itemByIds.set(item.scenario.id, item);
  }
}
