export class historyItem {
    total?: number;
    date: string =  new Date().toString();
    sortTime: number = Date.now();

    constructor(total: number) {
        this.total = total;
    }
}