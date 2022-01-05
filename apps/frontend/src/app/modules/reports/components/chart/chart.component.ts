import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'scenarii-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input()
  public type: ChartType = 'bar';

  @Input()
  public data: ChartData = { datasets: [] };

  @Input()
  public options: ChartOptions = {};
}
