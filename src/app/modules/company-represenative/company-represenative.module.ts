import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRepresenativeRoutingModule } from './company-represenative-routing.module';
import { GestionComponent } from './views/index/index.component';


@NgModule({
  declarations: [
    GestionComponent
  ],
  imports: [
    CommonModule,
    CompanyRepresenativeRoutingModule
  ]
})
export class CompanyRepresenativeModule { }
