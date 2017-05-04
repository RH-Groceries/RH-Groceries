import { historyItem } from './../../models/history-item';
import { FirebaseObjectObservable, AngularFire, FirebaseListObservable } from 'angularfire2';
import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { RatingModule } from "ngx-rating";

/**
 * This is the modal buyers will see when selecting their active lists.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buyer-list',
  templateUrl: 'buyer-list.html',
})
export class BuyerListModal {

  public list: ShoppingList;
  public items: Array<string>;
  public nameForUser: string;
  public shopper: FirebaseObjectObservable<any>;
  public tempRating: number;
  public tempReview: string;
  public reviewError: string = "";

  public itemsObservable: FirebaseListObservable<Array<string>>;
  public purchasedItemsObservable: FirebaseListObservable<Array<string>>;
  public itemsForDisplay: Array<string>;
  public purchasedItemsForDisplay: Array<string>;

  public listeningListStatusData: FirebaseObjectObservable<ShoppingList>;

  public tip?: number;
  public subtotal: FirebaseObjectObservable<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private authService: AuthService, private af: AngularFire) {
    this.list = this.navParams.get("listData");
    this.items = this.list.items;
    this.nameForUser = this.authService.rfUser.name;

    this.listeningListStatusData = this.af.database.object(`/lists/${this.list.$key}/status`);

    this.shopper = this.af.database.object(`/users/${this.list.shopper}`);

    this.itemsObservable = this.af.database.list(`/lists/${this.list.$key}/itemsLeft`);
    this.itemsObservable.subscribe((next) => {
      this.itemsForDisplay = next;
    });
    this.purchasedItemsObservable = this.af.database.list(`/lists/${this.list.$key}/purchased`);
    this.purchasedItemsObservable.subscribe((next) => {
      this.purchasedItemsForDisplay = next;
    });

    this.subtotal = this.af.database.object(`/lists/${this.list.$key}/subtotal`);

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BuyerList');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  confirmShopper(): void {
    this.af.database.object(`/lists/${this.list.$key}/status`).set(3);
  }

  confirmDelivery(): void {
    let buyerHistory = new historyItem(-1 * this.tip);
    let shopperHistory = new historyItem(this.tip);
    this.af.database.object(`/lists/${this.list.$key}/shopper`).subscribe((val) => {
      this.af.database.list('users/' + this.authService.authState.uid + '/paymentHistory').push(buyerHistory);
      this.af.database.list('users/' + val.$value + '/paymentHistory').push(shopperHistory);
      this.af.database.object(`/lists/${this.list.$key}/status`).set(5);
      this.af.database.object(`/lists/${this.list.$key}/tip`).set(this.tip);
    });
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
