import { Weekday } from "./weekday.model";

export class Task {
    id: string;
    name: string;
    dueTime: string;
    isArchived: string;
    completedTimes: number;
    failedTimes: number;
    utilization: number;
    weekdays: Weekday[];
    createdAt: Date;
    updatedAt: Date;

    fromJson(json: any) {
        this.id         = json.id;
        this.name       = json.name;
        this.dueTime    = json.due_time;
        this.isArchived = json.is_archived;

        this.completedTimes = json.completed_times;
        this.failedTimes    = json.failed_times;

        this.weekdays = json.weekdays;

        this.createdAt  = json.created_at;
        this.createdAt  = json.updated_at;

        this.utilization = this.calculateUtilization();

        return this;
    }

    calculateUtilization(): number {
        if (this.completedTimes == 0 && this.failedTimes == 0) {
            return 100
        }
        return Math.trunc(this.completedTimes / (this.completedTimes + this.failedTimes) * 100);
    }
}