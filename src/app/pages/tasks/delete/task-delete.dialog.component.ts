import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-task-delete-dialog',
    templateUrl: './task-delete.dialog.component.html',
    styleUrls: ['./task-delete.dialog.component.scss']
  })
export class TaskDeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<TaskDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}