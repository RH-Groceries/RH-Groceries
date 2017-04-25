import { FirebaseObjectObservable, AngularFire, FirebaseListObservable } from 'angularfire2';
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
  public purchasedListObservable: FirebaseListObservable<Array<string>>;
  public purchasedList: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private af: AngularFire) {
    this.list = this.navParams.get("listData");
    this.buyer = this.navParams.get("buyer");
    this.items = this.list.items;
    this.purchasedListObservable = this.af.database.list(`/lists/${this.list.$key}`);
    this.purchasedListObservable.subscribe( (snapshot) => {
      this.purchasedList = snapshot;
    })
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
    if (this.purchasedList.length == 0) {
      return false;
    } else {
      var index = this.purchasedList.indexOf(item);
      if (index !== -1) {
        return true;
      }
    }
    return false;
  }

}
