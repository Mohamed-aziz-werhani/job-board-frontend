import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsIndexComponent } from './views/jobs-index/jobs-index.component';
import { JobsPostComponent } from './views/jobs-post/jobs-post.component';
import { JobsApplicationComponent } from './views/jobs-application/jobs-application.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { RouterModule, Routes } from '@angular/router';
import { APPLICATION_ROUTES } from 'src/app/common/constants';
import { JobFormComponent } from './components/job-form/job-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';


/**
 * This module is responsible for managing jobs.
 * It handles 3 main views for the 'jobs' route
 */
const routes: Routes = [
  {
    path: '',
    component: JobsIndexComponent
  },
  {
    path: 'job-card/:id',
    component: JobCardComponent
  },
  {
    path: APPLICATION_ROUTES.jobs.nested.post,
    component: JobsPostComponent
  },
  {
    path: APPLICATION_ROUTES.jobs.nested.application,
    component: JobsApplicationComponent
  }
];

@NgModule({
  declarations: [
    JobsIndexComponent,
    JobsPostComponent,
    JobsApplicationComponent,
    JobCardComponent,
    JobFormComponent,
    CompanyFormComponent,
    JobApplicationsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
  ]
})
export class JobsManagerModule { }
