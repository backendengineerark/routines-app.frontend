import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Routine } from 'src/app/core/models/routine.model';
import { RoutinesService } from 'src/app/core/services/routines.service';

export interface Task {
  name: string;
  time: string;
  isFinished: boolean;
}

@Component({
  selector: 'app-routine-page',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss']
})
export class RoutinePage implements OnInit {

  displayedColumns = ['name', 'time', 'finished'];

  pendingRoutine: Routine[] = [];
  finishedRoutine: Routine[] = [];

  @ViewChild("pendingTable") pendingTable: MatTable<any>;
  @ViewChild("finishedTable") finishedTable: MatTable<any>;

  constructor(private routineService: RoutinesService) {}
  
  ngOnInit(): void {
    this.getRoutines(new Date())
  }

  getRoutines(date: Date) {
    this.routineService.getRoutines("1", date).subscribe(routines => {
      routines.forEach(routine => {
        if (routine.is_finished) {
          this.finishedRoutine.push(routine)
        } else {
          this.pendingRoutine.push(routine)
        }
      });
      this.renderTables();
    });
  }

  renderTables() {
    this.pendingTable.renderRows();
    this.finishedTable.renderRows();
  }
}
