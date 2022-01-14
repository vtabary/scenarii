import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScenariosRoutingModule } from './scenarios-routing.module';
import { ScenariosComponent } from './pages/scenarios/scenarios.component';
import { ScenarioComponent } from './components/scenario/scenario.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScenariosComponent, ScenarioComponent],
  imports: [
    CommonModule,
    ScenariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ScenariosModule {}
