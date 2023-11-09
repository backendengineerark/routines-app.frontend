import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-task-unarchive-dialog',
    templateUrl: './task-unarchive.dialog.component.html',
    styleUrls: ['./task-unarchive.dialog.component.scss']
  })
export class TaskUnarchiveDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<TaskUnarchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}