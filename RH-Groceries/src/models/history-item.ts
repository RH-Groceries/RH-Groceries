export class historyItem {
    total?: number;
    listKey?: string;
    date: string = new Date().toString();
    sortTime: number = Date.now();
    $key?: string;

    constructor(total: number, key: string) {
        this.total = total;
        this.listKey = key;
    }
}