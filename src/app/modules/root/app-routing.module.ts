import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupActivateComponent } from './views/signup-activate/signup-activate.component';
import { GestionComponent } from '../company-represenative/views/index/index.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RedirectIfLoggedInGuard } from 'src/app/common/guards/redirectIfAuthenticated.guard';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // canActivate: [RedirectIfLoggedInGuard],
    component: HomePageComponent
  },
  {
    path: 'sign-up',
    // canActivate: [RedirectIfLoggedInGuard],
    component: SignupComponent
  },
  {
    path: 'jobs',
    canActivate: [AuthGuard],
    loadChildren: () => import('../jobs-manager/jobs-manager.module').then(m => m.JobsManagerModule)
  },
  {
    path: 'application',
    canActivate: [AuthGuard],
    loadChildren: () => import('../application-manager/application-manager.module').then(m => m.ApplicationManagerModule)
  },
  {
    path: 'company',
    canActivate: [AuthGuard],
    loadChildren: () => import('../company-represenative/company-represenative.module').then(m => m.CompanyRepresenativeModule)
  },
  // {
  //   path: 'gestion',
  //   canActivate: [AuthGuard],
  //   component: GestionComponent
  // },
  { path: 'activation', component: SignupActivateComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
