import { Component } from '@angular/core';

export interface Task {
  name: string;
  time: string;
  isFinished: boolean;
}

@Component({
  selector: 'app-daily-page',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss']
})
export class DailyPage {
  displayedColumns = ['item', 'cost', 'finished'];
  pendingTasks: Task[] = [
    {name: 'English', time: '18:00', isFinished: false},
    {name: 'MBA', time: '19:00', isFinished: false},
    {name: 'POCs', time: '20:00', isFinished: false},
  ];

  finishedTasks: Task[] = [
    {name: 'Listen Playlist', time: '08:00', isFinished: false},
    {name: 'Anki', time: '09:00', isFinished: false},
  ];
}
