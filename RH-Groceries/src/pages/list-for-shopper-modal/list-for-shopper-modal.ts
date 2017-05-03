import { AuthService } from './../../providers/auth-service';
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
  public itemsForDisplay: Array<string>;
  public purchasedItemsForDisplay: Array<string>;
  public listeningListStatusData: FirebaseObjectObservable<ShoppingList>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private af: AngularFire, private authService: AuthService) {
    this.list = this.navParams.get("listData");
    this.listeningListStatusData = this.af.database.object(`/lists/${this.list.$key}/status`);

    this.buyer = this.navParams.get("buyer");
    this.itemsObservable = this.af.database.list(`/lists/${this.list.$key}/itemsLeft`);
    this.itemsObservable.subscribe( (next) => {
      this.itemsForDisplay = next;
    });
    this.purchasedItemsObservable = this.af.database.list(`/lists/${this.list.$key}/purchased`);
    this.purchasedItemsObservable.subscribe( (next) => {
      this.purchasedItemsForDisplay = next;
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListForShopperModal');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  readyToShop(): void {
    console.log("Ready to Shop");
    this.af.database.object(`/lists/${this.list.$key}/status`).set(2);
    this.af.database.object(`/lists/${this.list.$key}/shopper`).set(this.authService.authState.uid);
  }

  addToPurchased(item: any): void {
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
    var itemRef = firebase.database().ref().child(`/lists/${this.list.$key}/itemsLeft`);
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
    console.log("Removed Item: ", purchasedItem);

    var ref = firebase.database().ref().child(`/lists/${this.list.$key}/purchased`);
    var newPurchasedList: Array<string> = new Array<string>();
    this.purchasedItemsObservable.subscribe( (snapshot: any) => {
      snapshot.forEach( (next) => {
        newPurchasedList.push(next.$value);
      });
    });
    newPurchasedList.splice(newPurchasedList.indexOf(purchasedItem.$value), 1);
    ref.set(newPurchasedList);

    var newItemsList: Array<string> = new Array<string>();
    this.itemsObservable.subscribe( (snapshot: any) => {
      snapshot.forEach( (next) => {
        newItemsList.push(next.$value);
      });
    });
    newItemsList.push(purchasedItem.$value);
    var itemRef = firebase.database().ref().child(`/lists/${this.list.$key}/itemsLeft`);
    itemRef.set(newItemsList);
  }

}
