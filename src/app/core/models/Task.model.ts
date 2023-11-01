export class Task {
    id: string;
    name: string;
    time: string;
    completedTimes: number;
    failedTimes: number;
    utilization: number;
    createdAt: Date;
    updatedAt: Date;

    fromJson(json: any) {
        this.id           = json.id;
        this.name     = json.name;
        this.time    = json.time;

        this.completedTimes = json.completed_times;
        this.failedTimes = json.failed_times;
        this.utilization = json.utilization;

        this.createdAt  = json.created_at;
        this.createdAt  = json.updated_at;

        return this;
    }
}