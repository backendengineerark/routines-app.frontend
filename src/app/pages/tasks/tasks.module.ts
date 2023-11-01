import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPage } from './tasks.page';
import { MaterialModule } from 'src/app/material.module';
import { TasksRoutingModule } from './tasks.routing.module';
import { TaskFormDialogComponent } from './form/task-form.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskArchiveDialogComponent } from './archive/task-archive.dialog.component';



@NgModule({
  declarations: [
    TasksPage,
    TaskFormDialogComponent,
    TaskArchiveDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    MaterialModule
  ]
})
export class TasksModule { }
