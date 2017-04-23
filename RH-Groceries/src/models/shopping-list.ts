export class ShoppingList {
    items: Array<string>;

    get name(): string {
        return this.items[0];
    }
}