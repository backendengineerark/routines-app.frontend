import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'routine',
    loadChildren: () => import('./pages/routine/routine.module').then(m => m.RoutineModule)
  },
  {
    path: 'metrics',
    loadChildren: () => import('./pages/metrics/metrics.module').then(m => m.MetricsModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: '',
    redirectTo: 'daily',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
