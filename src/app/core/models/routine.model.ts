export class Routine {
    id: string;
    task_name: string;
    due_time: string;
    is_finished: boolean;

    fromJson(json: any) {
        this.id           = json.id;
        this.due_time     = json.due_time;
        this.task_name    = json.task_name;
        this.is_finished  = json.is_finished;

        return this;
    }
}