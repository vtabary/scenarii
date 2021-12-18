import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { SharedModule } from '../shared/shared.module';
import { StatusChartComponent } from './components/status-chart/status-chart.component';

@NgModule({
  declarations: [ReportsComponent, StatusChartComponent],
  imports: [CommonModule, SharedModule, ReportsRoutingModule, NgChartsModule],
})
export class ReportsModule {}
