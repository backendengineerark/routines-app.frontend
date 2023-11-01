import { Routine } from "./routine.model";

export class Metric {
    date: string = '';
    routines: Routine[] = [];

    fromJson(json: any) {
        this.date = json.date;

        this.routines.push(...json.routines.map((routineJson: any) => new Routine().fromJson(routineJson)));

        return this;
    }
}