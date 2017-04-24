export class ShoppingList {
    $key?: string;
    items: Array<string>;

    get nameForCard(): string {
        console.log("Something here");
        return this.items[0];
    }
}