export class Task {
    id: string;
    name: string;
    dueTime: string;
    isArchived: string;
    completedTimes: number;
    failedTimes: number;
    utilization: number;
    createdAt: Date;
    updatedAt: Date;

    fromJson(json: any) {
        this.id         = json.id;
        this.name       = json.name;
        this.dueTime    = json.due_time;
        this.isArchived = json.is_archived;

        this.completedTimes = json.completed_times;
        this.failedTimes    = json.failed_times;

        this.createdAt  = json.created_at;
        this.createdAt  = json.updated_at;

        this.calculateUtilization();

        return this;
    }

    calculateUtilization(): number {
        return this.utilization    = this.completedTimes / (this.completedTimes + this.failedTimes) * 100;
    }
}