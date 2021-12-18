import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import {
  ReportsRegistryService,
  ScenariiRegistryService,
} from '../../../shared/public-api';

@Component({
  selector: 'scenarii-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.css'],
})
export class StatusChartComponent {
  public chartType: ChartType = 'doughnut';
  public chartData: ChartData<'doughnut'> = {
    labels: ['Valid', 'Failed', 'Pending'],
    datasets: [],
  };

  constructor(
    scenariiRegistry: ScenariiRegistryService,
    reportsRegistry: ReportsRegistryService
  ) {
    const result = reportsRegistry.getAll().reduce(
      (acc, report) => {
        const index = report.valid ? 0 : 1;
        acc[index] = acc[index] + 1;
        return acc;
      },
      [0, 0, 0]
    );

    result[2] = scenariiRegistry.length - reportsRegistry.length;
    this.chartData.datasets.push({ data: result });
  }
}
