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
  
  atLeastOneWeekdaySelected: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const atLeastOneDaySelected = this.data.weekdays
      .some((weekday: Weekday) => weekday.isSelected)
    if (! atLeastOneDaySelected) {
      this.atLeastOneWeekdaySelected = false;
    }
  }

  cancel(): void {
    this.dialogRef.close();
    this.data.form.reset();
  }

  selectWeekday(weekday: Weekday) {
    weekday.isSelected = ! weekday.isSelected

    if (weekday.numberDay == -1) {
      if (weekday.isSelected) {
        this.data.weekdays.forEach((weekday: Weekday) => {
          weekday.isSelected = true;
        });
      } else {
        this.data.weekdays.forEach((weekday: Weekday) => {
          weekday.isSelected = false;
        });
      }
    } else {
      const onlyWeekdays = this.data.weekdays.slice(1, this.data.weekdays.length);
      const allSelected = onlyWeekdays.every((weekday: Weekday) => weekday.isSelected)
      if (allSelected) {
        this.data.weekdays[0].isSelected = true;
      } else {
        this.data.weekdays[0].isSelected = false;
      }
    }

    const atLeastOneDaySelected = this.data.weekdays
      .some((weekday: Weekday) => weekday.isSelected)
    if (! atLeastOneDaySelected) {
      this.atLeastOneWeekdaySelected = false;
      return;
    }
    this.atLeastOneWeekdaySelected = true;
  }
}