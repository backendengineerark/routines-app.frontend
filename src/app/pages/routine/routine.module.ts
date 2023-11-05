import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinePage } from './routine.page';
import { RoutineRoutingModule } from './routine.routing.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    RoutinePage
  ],
  imports: [
    CommonModule,
    RoutineRoutingModule,
    MaterialModule
  ]
})
export class RoutineModule { }
