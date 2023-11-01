import { Component, Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Routine } from "src/app/core/models/routine.model";

@Component({
    selector: 'app-task-form-dialog',
    templateUrl: './task-form.dialog.component.html',
    styleUrls: ['./task-form.dialog.component.scss']
  })
export class TaskFormDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
    this.data.form.reset();
  }
}