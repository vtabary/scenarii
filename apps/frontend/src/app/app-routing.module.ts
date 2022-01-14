import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () =>
      import('./modules/file-manager/file-manager.module').then(
        (m) => m.FileManagerModule
      ),
    path: 'file',
  },
  {
    loadChildren: () =>
      import('./modules/runner/runner.module').then((m) => m.RunnerModule),
    path: 'run',
  },
  {
    loadChildren: () =>
      import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    path: 'reports',
  },
  {
    path: 'scenarios',
    loadChildren: () =>
      import('./modules/scenarios/scenarios.module').then(
        (m) => m.ScenariosModule
      ),
  },
  { path: '**', redirectTo: 'file' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
