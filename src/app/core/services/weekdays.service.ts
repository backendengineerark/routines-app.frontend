import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from '../../../environments/environment';
import { Observable, map } from "rxjs";
import { Metric } from "../models/metric.model";
import { Weekday } from "../models/weekday.model";

@Injectable({
    providedIn: 'root'
})
export class WeekdaysService {

    constructor(private http: HttpClient) {}

    getWeekdays(): Observable<Weekday[]> {
        return this.http
            .get<Weekday[]>(`${Environment.API_URL}/weekdays`)
            .pipe(map(json => json.map(json => {
            return Weekday.fromJson(json);
        })));
    }
}