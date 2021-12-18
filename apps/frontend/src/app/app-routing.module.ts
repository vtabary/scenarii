import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () =>
      import('./modules/loader/loader.module').then((m) => m.LoaderModule),
    path: 'load',
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
  { path: '**', redirectTo: 'load' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
