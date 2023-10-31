export class Task {
    id: string = '';
    name: string = '';
    is_finished: boolean = false;

    fromJson(json: any) {
        this.id           = json.id;
        this.name         = json.name;
        this.is_finished = json.is_finished;

        return this;
    }
}