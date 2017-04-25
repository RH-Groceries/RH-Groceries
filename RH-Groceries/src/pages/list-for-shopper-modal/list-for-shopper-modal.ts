import { FirebaseObjectObservable, AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ShoppingList } from "../../models/shopping-list";
import * as firebase from 'firebase';

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
  public itemsObservable: FirebaseListObservable<Array<string>>;
  public buyer: FirebaseObjectObservable<any>;
  public purchasedItemsObservable: FirebaseListObservable<Array<string>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private af: AngularFire) {
    this.list = this.navParams.get("listData");
    this.buyer = this.navParams.get("buyer");
    this.itemsObservable = this.af.database.list(`/lists/${this.list.$key}/items`);
    this.purchasedItemsObservable = this.af.database.list(`/lists/${this.list.$key}/purchased`);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListForShopperModal');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  addToPurchased(item: any): void {



    // REMAKE ARRAY AND SET HERE


    console.log("Added Item: ", item);
    // this.itemsObservable.remove(item);
    var newItemsList: Array<string> = new Array<string>();
    this.itemsObservable.subscribe( (snapshot: any) => {
      console.log("Snapshot: ", snapshot);
      snapshot.forEach( (next) => {
        newItemsList.push(next.$value);
      });
    });
    newItemsList.splice(newItemsList.indexOf(item.$value), 1);
    var itemRef = firebase.database().ref().child(`/lists/${this.list.$key}/items`);
    console.log("New Items List: ", newItemsList);
    itemRef.set(newItemsList);

    var ref = firebase.database().ref().child(`/lists/${this.list.$key}/purchased`);
    console.log(`${this.list.$key}`);
    console.log(`/lists/${this.list.$key}/purchased`);
    console.log(item);
    var newPurchasedList: Array<string> = new Array<string>();
    this.purchasedItemsObservable.subscribe( (snapshot: any) => {
      snapshot.forEach( (next) => {
        newPurchasedList.push(next.$value);
      });
    });
    newPurchasedList.push(item.$value);
    console.log(newPurchasedList);
    ref.set(newPurchasedList);
  }

  removeFromPurchased(purchasedItem: any): void {
    var ref = firebase.database().ref().child(`/lists/${this.list.$key}/items`);
    ref.push(purchasedItem.$value);
    this.purchasedItemsObservable.remove(purchasedItem);
  }

  // checkIfPurchased(item: string): boolean {
  //   if (this.purchasedList.length == 0) {
  //     return false;
  //   } else {
  //     var index = this.purchasedList.indexOf(item);
  //     if (index !== -1) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // Have two lists items and purchased from firebase

  // Get Array, Make New, Perform Action, Resubmit

}
