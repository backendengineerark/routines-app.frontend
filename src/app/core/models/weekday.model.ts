export class Weekday {
    id: string;
    name: string;
    numberDay: number;
    isSelected: boolean;

    constructor(id: string, name: string, numberDay: number) {
        this.id = id;
        this.name = name;
        this.numberDay = numberDay;
        this.isSelected = true;
    }

    static fromJson(json: any): Weekday {
        return new Weekday(json.id, json.name, json.number_day);
    }
}