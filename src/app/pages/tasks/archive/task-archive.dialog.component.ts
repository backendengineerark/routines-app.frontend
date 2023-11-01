import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-task-archive-dialog',
    templateUrl: './task-archive.dialog.component.html',
    styleUrls: ['./task-archive.dialog.component.scss']
  })
export class TaskArchiveDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<TaskArchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}