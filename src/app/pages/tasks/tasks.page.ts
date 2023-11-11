import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskFormDialogComponent } from './form/task-form.dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Task } from 'src/app/core/models/task.model';
import { TaskArchiveDialogComponent } from './archive/task-archive.dialog.component';
import { TaskUnarchiveDialogComponent } from './unarchive/task-unarchive.dialog.component';
import { TaskDeleteDialogComponent } from './delete/task-delete.dialog.component';
import { Weekday } from 'src/app/core/models/weekday.model';
import { WeekdaysService } from 'src/app/core/services/weekdays.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnInit {

  taskForm: FormGroup;
  tasks: Task[] = [];
  weekdays: Weekday[] = [];
  showingActiveTasks: boolean = true;

  displayedColumns: string[] = ['name', 'time', 'completed times', 'failed times', 'utilization', 'star'];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private weekdaysService: WeekdaysService
    ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllActiveTasks();
    this.getAllWeekdays();
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
        form: this.taskForm,
        weekdays: this.weekdays
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
      hour: taskToUpdate.dueTime.split(':')[0],
      minute: taskToUpdate.dueTime.split(':')[1]
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
      if (! result) {
        return;
      }
      this.taskService.archiveTasks(taskToArchive.id)
      .subscribe({
        next: () => {
          this.getAllActiveTasks();
          this.taskForm.reset();
        },
        error: (error) => {
            console.log(error)
          }
        })
    });
  }

  openUnarchiveDialog(id: string): void {
    const taskToUnarchive = this.tasks.find(task => task.id == id);

    const dialogRef = this.dialog.open(TaskUnarchiveDialogComponent, {
      data: taskToUnarchive,
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (! result) {
        return;
      }
      this.taskService.unarchiveTasks(taskToUnarchive.id)
      .subscribe({
        next: () => {
          this.getAllActiveTasks();
          this.taskForm.reset();
        },
        error: (error) => {
            console.log(error)
          }
        })
    });
  }

  openDeleteDialog(id: string): void {
    const taskToUnarchive = this.tasks.find(task => task.id == id);

    const dialogRef = this.dialog.open(TaskDeleteDialogComponent, {
      data: taskToUnarchive,
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (! result) {
        return;
      }
      this.taskService.deleteTasks(taskToUnarchive.id)
      .subscribe({
        next: () => {
          this.getAllActiveTasks();
          this.taskForm.reset();
        },
        error: (error) => {
            console.log(error)
          }
        })
    });
  }

  getAllActiveTasks() {
    this.taskService.getTasks('1', false)
      .subscribe(tasks => this.tasks = tasks);
      this.showingActiveTasks = true
  }

  getAllWeekdays() {
    this.weekdays.push(new Weekday('ID', 'All days', 0))
    this.weekdaysService.getWeekdays()
      .subscribe(weekdays => this.weekdays.push(...weekdays));
  }

  getAllArchivedTasks() {
    this.taskService.getTasks('1', true)
      .subscribe(tasks => this.tasks = tasks);
      this.showingActiveTasks = false
  }

  createTask(data: any) {
    const newTask: Task = new Task();
    newTask.name = data.name;
    newTask.dueTime = `${data.hour}:${data.minute}:00`;

    this.taskService.saveTasks(newTask)
    .subscribe({
      next: () => {
        this.getAllActiveTasks();
        this.taskForm.reset();
      },
      error: (error) => {
          console.log(error)
        }
      })
  }

  updateTask(taskToUpdate: Task, data: any) {
    const newTask: Task = new Task();
    newTask.name = data.name;
    newTask.dueTime = `${data.hour}:${data.minute}:00`;

    this.taskService.updateTasks(taskToUpdate.id, newTask)
    .subscribe({
      next: () => {
        this.getAllActiveTasks();
        this.taskForm.reset();
      },
      error: (error) => {
        console.log(error)
      }
      })
  }

  getColorByUtilization(utilization: number): string {
    if (utilization < 50) {
      return 'red';
    } else if (utilization < 70) {
      return 'orange';
    } else if (utilization <= 100) {
      return 'green';
    }
    return 'black';
  }

  getTaskIndex(index: number) {
    return ++index;
  }
}
