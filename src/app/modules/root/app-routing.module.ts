import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', loadChildren: () => import('../jobs-manager/jobs-manager.module').then(m => m.JobsManagerModule) },
  { path: 'application', loadChildren: () => import('../application-manager/application-manager.module').then(m => m.ApplicationManagerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
