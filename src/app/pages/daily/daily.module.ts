import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyPage } from './daily.page';
import { DailyRoutingModule } from './daily.routing.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    DailyPage
  ],
  imports: [
    CommonModule,
    DailyRoutingModule,
    MaterialModule
  ]
})
export class DailyModule { }
