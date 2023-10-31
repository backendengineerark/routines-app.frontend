import { Task } from "./task.model";

export class Metric {
    date: string = '';
    daily_tasks: Task[] = [];

    fromJson(json: any) {
        this.date = json.date;

        this.daily_tasks.push(...json.daily_tasks.map((taskJson: any) => new Task().fromJson(taskJson)));

        return this;
    }
}