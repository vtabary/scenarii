import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IReport } from '../../models/report';
import { DataManagerService } from '../data-manager/data-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsRegistryService {
  public registryUpdated = new BehaviorSubject<IReport[]>([]);
  private reports: IReport[] = [];
  private reportsByIds: { [id: string]: IReport } = {};

  constructor(private dataManager: DataManagerService) {}

  /**
   * Get a scenario by its id.
   */
  public get(id: string):
    | (IReport & {
        index: number;
      })
    | undefined {
    if (!this.reportsByIds[id]) {
      return undefined;
    }

    return {
      ...this.reportsByIds[id],
      index: this.reports.indexOf(this.reportsByIds[id]),
    };
  }

  /**
   * Return all the reports
   */
  public getAll(): IReport[] {
    return [...this.reports];
  }

  /**
   * Check the data manager to see if there is some scenario data in it
   */
  public load(): boolean {
    const data = this.dataManager.get<IReport[]>('reports');
    if (!data || data.length === 0) {
      return false;
    }

    this.reset(data);
    return true;
  }

  public set(report: IReport): void {
    const item = this.reportsByIds[report.scenarioId];

    if (!item) {
      this.addReport(report);
    } else {
      item.comment = report.comment;
      item.valid = report.valid;
    }

    this.registryUpdated.next(this.getAll());
    this.dataManager.set('reports', this.reports);
  }

  /**
   * Clear the registry and set the new reports.
   */
  public reset(reports: IReport[]): void {
    this.clear();
    this.addReports(reports);
  }

  /**
   * Get the next scenario from the given scenario, or undefined if none is existing
   */
  public next(id: string):
    | (IReport & {
        index: number;
      })
    | undefined {
    const scenario = this.get(id);

    if (!scenario) {
      return undefined;
    }

    return this.get(this.reports[scenario.index + 1]?.scenarioId);
  }

  /**
   * Get the previous scenario from the given scenario, or undefined if none is existing
   */
  public previous(id: string):
    | (IReport & {
        index: number;
      })
    | undefined {
    const scenario = this.get(id);

    if (!scenario) {
      return undefined;
    }

    return this.get(this.reports[scenario.index - 1]?.scenarioId);
  }

  /**
   * Get the number of scenarios in the registry
   */
  public get length(): number {
    return this.reports.length;
  }

  private addReports(reports: IReport[]): void {
    reports.forEach((report) => this.addReport(report));

    this.registryUpdated.next(this.getAll());
    this.dataManager.set('reports', this.reports);
  }

  private addReport(report: IReport): void {
    if (!report.scenarioId) {
      return;
    }

    this.reports.push(report);
    this.reportsByIds[report.scenarioId] = report;
  }

  private clear(): void {
    this.reports = [];
    this.reportsByIds = {};
    this.dataManager.delete('reports');
    this.registryUpdated.next(this.getAll());
  }
}
