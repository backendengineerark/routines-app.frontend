import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from '../../../environments/environment';
import { Observable, map } from "rxjs";
import { Task } from "../models/task.model";
import { Routine } from "../models/routine.model";

@Injectable({
    providedIn: 'root'
})
export class RoutinesService {

    constructor(private http: HttpClient) {}

    getRoutines(userId: string, date: Date): Observable<Routine[]> {
        return this.http
            .get<Routine[]>(`${Environment.API_URL}/routines`, {
                params: new HttpParams()
                    .set('user_id', userId)
                    .set('date', this.formatDate(date))
            })
            .pipe(map(json => json.map(json => {
            return (new Routine()).fromJson(json);
        })));
    }

    finishRoutines(userId: string, taskId: string): Observable<void> {
        return this.http
            .post<void>(`${Environment.API_URL}/routines/${taskId}/today-finish`, {});
    }

    unfinishRoutines(userId: string, taskId: string): Observable<void> {
        return this.http
            .post<void>(`${Environment.API_URL}/routines/${taskId}/today-unfinish`, {});
    }

    formatDate(date = new Date()) {
        return [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join('-');
    }

    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
}