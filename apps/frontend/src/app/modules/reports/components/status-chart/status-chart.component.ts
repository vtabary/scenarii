import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import {
  ReportsRegistryService,
  ScenariosRegistryService,
} from '../../../shared/public-api';
import { getStatusReport } from '../helpers/results';

@Component({
  selector: 'scenarii-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.css'],
})
export class StatusChartComponent {
  public chartType: ChartType = 'pie';
  public chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(
    scenarios: ScenariosRegistryService,
    reports: ReportsRegistryService
  ) {
    const statusReport = getStatusReport(reports.getAll(), scenarios.length);

    this.chartData.labels = statusReport.map((report) => report.label);
    this.chartData.datasets = statusReport.reduce(
      (acc, report) => {
        acc[0].data.push(report.data[0]);
        acc[0].backgroundColor.push(report.backgroundColor);
        acc[0].hoverBackgroundColor.push(report.hoverBackgroundColor);
        return acc;
      },
      [
        {
          data: [] as number[],
          backgroundColor: [] as string[],
          hoverBackgroundColor: [] as string[],
          hoverBorderWidth: 0,
        },
      ]
    );
  }
}
