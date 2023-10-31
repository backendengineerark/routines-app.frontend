import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
    selector: 'app-task-form-dialog',
    templateUrl: './task-form.dialog.component.html',
    styleUrls: ['./task-form.dialog.component.scss']
  })
export class TaskFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}