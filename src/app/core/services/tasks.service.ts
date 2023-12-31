import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from '../../../environments/environment';
import { Observable, map } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(private http: HttpClient) {}

    getTasks(userId: string, isArchived: boolean): Observable<Task[]> {
        return this.http
            .get<Task[]>(`${Environment.API_URL}/tasks`, {
                params: new HttpParams()
                    .set('user_id', userId)
                    .set('is_archived', isArchived)
            })
            .pipe(map(json => json.map(json => {
            return (new Task()).fromJson(json);
        })));
    }

    saveTasks(task: Task): Observable<any> {
        return this.http.post(`${Environment.API_URL}/tasks`, {...task, due_time: task.dueTime});
    }

    updateTasks(id: string, task: Task): Observable<any> {
        return this.http.put(`${Environment.API_URL}/tasks/${id}`, {...task, due_time: task.dueTime});
    }

    archiveTasks(id: string): Observable<any> {
        return this.http.post(`${Environment.API_URL}/tasks/${id}/archive`, {});
    }

    unarchiveTasks(id: string): Observable<any> {
        return this.http.post(`${Environment.API_URL}/tasks/${id}/unarchive`, {});
    }

    deleteTasks(id: string): Observable<any> {
        return this.http.delete(`${Environment.API_URL}/tasks/${id}`, {});
    }
}