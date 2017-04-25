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
    // 0: Inactive
    // 1: Active
    // 2: AwaitingBuyerConfirmation
    // 3: Shopping
    // 4: AwaitingBuyerApproval
    // 5: Complete

    get nameForCard(): string {
        console.log("Something here");
        return this.items[0];
    }
}