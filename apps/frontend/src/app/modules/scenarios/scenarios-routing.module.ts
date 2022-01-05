import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScenariosComponent } from './pages/scenarios/scenarios.component';

const routes: Routes = [{ path: '', component: ScenariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenariosRoutingModule {}
