import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RunnerRoutingModule } from './runner-routing.module';
import { StepComponent } from './pages/step/step.component';
import { DoneComponent } from './pages/done/done.component';

@NgModule({
  declarations: [StepComponent, DoneComponent],
  imports: [CommonModule, SharedModule, RunnerRoutingModule],
})
export class RunnerModule {}
