import { AuthService } from './../../providers/auth-service';
import { FirebaseObjectObservable, AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ShoppingList } from "../../models/shopping-list";
import * as firebase from 'firebase';
import { RatingModule } from "ngx-rating";

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
  public tempRating: number;
  public tempReview: string;
  public reviewError: string = "";
  public hasReviewed: boolean = false;

  public price: string = "";
  public tip: FirebaseObjectObservable<string>;
  public subtotal: FirebaseObjectObservable<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private af: AngularFire, private authService: AuthService) {
    this.list = this.navParams.get("listData");
    this.listeningListStatusData = this.af.database.object(`/lists/${this.list.$key}/status`);

    this.buyer = this.navParams.get("buyer");
    this.itemsObservable = this.af.database.list(`/lists/${this.list.$key}/itemsLeft`);
    this.itemsObservable.subscribe((next) => {
      this.itemsForDisplay = next;
    });
    this.purchasedItemsObservable = this.af.database.list(`/lists/${this.list.$key}/purchased`);
    this.purchasedItemsObservable.subscribe((next) => {
      this.purchasedItemsForDisplay = next;
    });

    this.tip = this.af.database.object(`/lists/${this.list.$key}/tip`);
    this.subtotal = this.af.database.object(`/lists/${this.list.$key}/subtotal`);

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
    this.itemsObservable.subscribe((snapshot: any) => {
      console.log("Snapshot: ", snapshot);
      snapshot.forEach((next) => {
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
    this.purchasedItemsObservable.subscribe((snapshot: any) => {
      snapshot.forEach((next) => {
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
    this.purchasedItemsObservable.subscribe((snapshot: any) => {
      snapshot.forEach((next) => {
        newPurchasedList.push(next.$value);
      });
    });
    newPurchasedList.splice(newPurchasedList.indexOf(purchasedItem.$value), 1);
    ref.set(newPurchasedList);

    var newItemsList: Array<string> = new Array<string>();
    this.itemsObservable.subscribe((snapshot: any) => {
      snapshot.forEach((next) => {
        newItemsList.push(next.$value);
      });
    });
    newItemsList.push(purchasedItem.$value);
    var itemRef = firebase.database().ref().child(`/lists/${this.list.$key}/itemsLeft`);
    itemRef.set(newItemsList);
  }

  confirmShoppingComplete(): void {
    this.af.database.object(`/lists/${this.list.$key}/subtotal`).set(this.price);
    this.af.database.object(`/lists/${this.list.$key}/status`).set(4);
  }

  submitReview() {
    if (!this.tempReview || this.tempReview.length <= 0) {
      this.reviewError = "Please write a review before submitting"
    }
    else if (!this.tempRating || this.tempRating < 0) {
      this.reviewError = "Please set a rating by clicking on the stars before submitting";
    }
    else {
      console.log("submitting rating = " + this.tempRating + ", review = " + this.tempReview);
      this.reviewError = "";
      this.closeModal();
    }

  }

}
