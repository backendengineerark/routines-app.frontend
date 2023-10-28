import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsPage } from './metrics.page';
import { MetricsRoutingModule } from './metrics.routing.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    MetricsPage
  ],
  imports: [
    CommonModule,
    MetricsRoutingModule,
    MaterialModule
  ]
})
export class MetricsModule { }
