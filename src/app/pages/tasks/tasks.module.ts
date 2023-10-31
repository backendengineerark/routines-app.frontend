import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPage } from './tasks.page';
import { MaterialModule } from 'src/app/material.module';
import { TasksRoutingModule } from './tasks.routing.module';
import { TaskFormDialogComponent } from './form/task-form.dialog.component';



@NgModule({
  declarations: [
    TasksPage,
    TaskFormDialogComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule
  ]
})
export class TasksModule { }
