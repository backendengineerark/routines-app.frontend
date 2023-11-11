import { Component, Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Routine } from "src/app/core/models/routine.model";
import { Weekday } from "src/app/core/models/weekday.model";

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

  allSelection() {
    if (this.data.weekdays[0].isSelected) {
      this.data.weekdays.forEach((weekday: Weekday) => {
        weekday.isSelected = false;
      });
    } else {
      this.data.weekdays.forEach((weekday: Weekday) => {
        weekday.isSelected = true;
      });
    }
  }
}