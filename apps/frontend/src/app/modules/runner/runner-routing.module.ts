import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepComponent } from './pages/step/step.component';
import { CurrentScenarioResolver } from './services/current-scenario/current-scenario.resolver';
import { ScenarioResolver } from './services/scenario-resolver/scenario.resolver';
import { DoneComponent } from './pages/done/done.component';

const routes: Routes = [
  {
    path: 'done',
    component: DoneComponent,
  },
  {
    path: ':id',
    component: StepComponent,
    resolve: {
      scenario: ScenarioResolver,
    },
  },
  {
    path: '',
    resolve: {
      scenario: CurrentScenarioResolver,
    },

    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunnerRoutingModule {}
