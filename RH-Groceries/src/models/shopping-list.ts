export class ShoppingList {
    $key?: string;
    items: Array<string>;
    buyer: string;
    shopper?: string;
    subtotal: number;
    tip: number;
    purchased?: Array<string>;
    status: number;

    // TODO: Need to establish what statuses there are...

    get nameForCard(): string {
        console.log("Something here");
        return this.items[0];
    }
}