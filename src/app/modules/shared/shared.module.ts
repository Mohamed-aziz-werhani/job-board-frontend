import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CUSTOM IMPORTS
import { IconComponent } from './components/icon/icon.component';



@NgModule({
  declarations: [
    IconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconComponent
  ]
})
export class SharedModule { }
