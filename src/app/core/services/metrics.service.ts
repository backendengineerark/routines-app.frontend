import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from '../../../environments/environment';
import { Observable, map } from "rxjs";
import { Metric } from "../models/metric.model";

@Injectable({
    providedIn: 'root'
})
export class MetricsService {

    constructor(private http: HttpClient) {}

    getMetrics(initialDate: Date, endDate: Date): Observable<Metric[]> {
        return this.http
            .get<Metric[]>(`${Environment.API_URL}/metrics`, {
                params: new HttpParams()
                    .set('initial_date', initialDate.toISOString().split('T')[0])
                    .set('end_date', endDate.toISOString().split('T')[0])
            })
            .pipe(map(json => json.map(json => {
            return (new Metric()).fromJson(json);
        })));
    }
}