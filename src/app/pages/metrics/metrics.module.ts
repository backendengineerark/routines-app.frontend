import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsPage } from './metrics.page';
import { MetricsRoutingModule } from './metrics.routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MetricsPage
  ],
  imports: [
    CommonModule,
    MetricsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MetricsModule { }
