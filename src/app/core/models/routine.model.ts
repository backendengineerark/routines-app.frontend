import { Task } from "./task.model";

export class Routine {
    id: string;
    task: Task
    reference_date: string;
    is_finished: boolean;
    created_at: Date;
    updatedAt: Date;

    fromJson(json: any) {
        this.id           = json.id;
        this.task = new Task().fromJson(json.task)
        this.reference_date     = json.reference_date;
        this.is_finished = json.is_finished
        this.created_at    = new Date(json.created_at);
        this.updatedAt  = new Date(json.updated_at);

        return this;
    }
}