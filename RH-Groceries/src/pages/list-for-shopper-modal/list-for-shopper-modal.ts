import { FirebaseObjectObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ShoppingList } from "../../models/shopping-list";

/**
 * This is the modal shoppers will see on active lists.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-for-shopper-modal',
  templateUrl: 'list-for-shopper-modal.html',
})
export class ListForShopperModal {

  public list: ShoppingList;
  public items: Array<string>;
  public buyer: FirebaseObjectObservable<any>;
  public listObservable: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private af: AngularFire) {
    this.list = this.navParams.get("listData");
    this.buyer = this.navParams.get("buyer");
    this.items = this.list.items;
    this.listObservable = this.af.database.object(`/lists/${this.list.$key}`);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListForShopperModal');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  addToPurchased(item: string): void {
    console.log("Added Item: ", item);
    // this.list.purchased.push(item);
  }

  checkIfPurchased(item: string): boolean {
    // console.log(this.list.purchased.indexOf(item))
    // Check if in purchased array
    // if (this.listObservable.purchased)


    return true;
  }

}
