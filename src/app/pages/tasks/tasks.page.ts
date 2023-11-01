import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './form/task-form.dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Task } from 'src/app/core/models/task.model';
import { TaskArchiveDialogComponent } from './archive/task-archive.dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
];

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnInit {

  taskForm: FormGroup;
  tasks: Task[];

  displayedColumns: string[] = ['name', 'time', 'completed times', 'failed times', 'utilization', 'star'];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private taskService: TasksService
    ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllTasks();
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      hour: ['', [
        Validators.required, 
        Validators.pattern(/^\d+$/),
        Validators.max(23),
        Validators.minLength(2),
        Validators.maxLength(2)
      ]],
      minute: ['', [
        Validators.required, 
        Validators.pattern(/^\d+$/),
        Validators.max(59),
        Validators.minLength(2),
        Validators.maxLength(2)
      ]]
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: {
        type: 'create',
        form: this.taskForm
      },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (! result) {
        return;
      }
      this.createTask(result.getRawValue());
    });
  }
  
  openUpdateDialog(id: string): void {
    const taskToUpdate = this.tasks.find(task => task.id == id);

    this.taskForm.setValue({
      name: taskToUpdate.name,
      hour: taskToUpdate.time.split(':')[0],
      minute: taskToUpdate.time.split(':')[1]
    });
    
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      data: {
        type: 'update',
        form: this.taskForm
      },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (! result) {
        return;
      }
      this.updateTask(taskToUpdate, result.getRawValue());
    });
  }

  openArchiveDialog(id: string): void {
    const taskToArchive = this.tasks.find(task => task.id == id);

    const dialogRef = this.dialog.open(TaskArchiveDialogComponent, {
      data: taskToArchive,
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (! result) {
        return;
      }
      this.taskService.archiveTasks(taskToArchive.id);
    });
  }

  getAllTasks() {
    this.taskService.getTasks('1')
      .subscribe(tasks => this.tasks = tasks);
  }

  createTask(data: any) {
    const newTask: Task = new Task();
    newTask.name = data.name;
    newTask.time = `${data.hour}:${data.minute}`;

    this.taskService.saveTasks(newTask)
    .subscribe({
      next: () => {
        this.getAllTasks();
        
      },
      error: (error) => {
          console.log(error)
        }
      })
  }

  updateTask(taskToUpdate: Task, data: any) {
    const newTask: Task = new Task();
    newTask.name = data.name;
    newTask.time = `${data.hour}:${data.minute}`;

    this.taskService.updateTasks(taskToUpdate.id, newTask)
    .subscribe({
      next: () => {
        this.getAllTasks();
        
      },
      error: (error) => {
        console.log(error)
      }
      })
  }
}
