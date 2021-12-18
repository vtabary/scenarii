import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IScenario } from '../../models/scenario';
import { DataManagerService } from '../data-manager/data-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ScenariiRegistryService {
  public registryUpdated = new BehaviorSubject<IScenario[]>([]);
  private scenarii: IScenario[] = [];
  private scenarioByIds: { [id: string]: IScenario } = {};

  constructor(private dataManager: DataManagerService) {}

  /**
   * Get a scenario by its id.
   */
  public get(id: string):
    | (IScenario & {
        index: number;
      })
    | undefined {
    if (!this.scenarioByIds[id]) {
      return undefined;
    }

    return {
      ...this.scenarioByIds[id],
      index: this.scenarii.indexOf(this.scenarioByIds[id]),
    };
  }

  /**
   * Return all the scenarii
   */
  public getAll(): IScenario[] {
    return [...this.scenarii];
  }

  /**
   * Check the data manager to see if there is some scenario data in it
   */
  public load(): boolean {
    const data = this.dataManager.get<IScenario[]>('scenarii');
    if (!data || data.length === 0) {
      return false;
    }

    this.reset(data);
    return true;
  }

  /**
   * Clear the registry and set the new scenarii.
   */
  public reset(scenarii: IScenario[]): void {
    this.clear();
    this.addScenarii(scenarii);
  }

  /**
   * Get the next scenario from the given scenario, or undefined if none is existing
   */
  public next(id: string):
    | (IScenario & {
        index: number;
      })
    | undefined {
    const scenario = this.get(id);

    if (!scenario) {
      return undefined;
    }

    return this.get(this.scenarii[scenario.index + 1]?.id);
  }

  /**
   * Get the previous scenario from the given scenario, or undefined if none is existing
   */
  public previous(id: string):
    | (IScenario & {
        index: number;
      })
    | undefined {
    const scenario = this.get(id);

    if (!scenario) {
      return undefined;
    }

    return this.get(this.scenarii[scenario.index - 1]?.id);
  }

  /**
   * Get the number of scenarios in the registry
   */
  public get length(): number {
    return this.scenarii.length;
  }

  private addScenarii(scenarii: IScenario[]): void {
    scenarii.forEach((scenario) => this.addScenario(scenario));

    this.registryUpdated.next(this.getAll());
    this.dataManager.set('scenarii', this.scenarii);
  }

  private addScenario(scenario: IScenario): void {
    if (!scenario.id) {
      return;
    }

    this.scenarii.push(scenario);
    this.scenarioByIds[scenario.id] = scenario;
  }

  private clear(): void {
    this.scenarii = [];
    this.scenarioByIds = {};
    this.dataManager.delete('scenarii');
    this.registryUpdated.next(this.getAll());
  }
}
