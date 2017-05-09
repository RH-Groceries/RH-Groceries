import { Http } from '@angular/http';
import { historyItem } from './../../models/history-item';
import { FirebaseObjectObservable, AngularFire, FirebaseListObservable } from 'angularfire2';
import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { RatingModule } from "ngx-rating";
import * as firebase from 'firebase';

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

  public shopperStripeId: string;

  public payerId: string = "";
  public destinationId: string = "";
  public submittedSubtotal: string = "";

  public total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private authService: AuthService, private af: AngularFire, private http: Http) {
    this.list = this.navParams.get("listData");
    this.items = this.list.items;
    this.nameForUser = this.authService.rfUser.name;

    this.listeningListStatusData = this.af.database.object(`/lists/${this.list.$key}/status`);

    this.af.database.object(`/lists/${this.list.$key}/shopper`).subscribe( (newShopper) => {
      this.shopper = this.af.database.object(`/users/${newShopper.$value}`);
    });

    this.itemsObservable = this.af.database.list(`/lists/${this.list.$key}/itemsLeft`);
    this.itemsObservable.subscribe((next) => {
      this.itemsForDisplay = next;
    });
    this.purchasedItemsObservable = this.af.database.list(`/lists/${this.list.$key}/purchased`);
    this.purchasedItemsObservable.subscribe((next) => {
      this.purchasedItemsForDisplay = next;
    });

    this.subtotal = this.af.database.object(`/lists/${this.list.$key}/subtotal`);


    this.af.database.object(`/users/${this.authService.authState.uid}/stripeAccount/id`).subscribe((payerId) => {
      this.payerId = payerId.$value;
    });

    this.af.database.object(`/users/${this.list.shopper}/stripeAccount/id`).subscribe((destinationId) => {
      this.destinationId = destinationId.$value;
    });

    this.af.database.object(`/lists/${this.list.$key}/subtotal`).subscribe((subTotal) => {
      this.submittedSubtotal = subTotal.$value;
    });

    this.af.database.object(`/lists/${this.list.$key}/subtotal`).subscribe( (fireSubtotal) => {
      this.af.database.object(`/lists/${this.list.$key}/tip`).subscribe( (fireTip) => {
        this.total = Number(fireSubtotal.$value) + Number(fireTip.$value);
      });
    });

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
    // Do Stripe Work Here

    // Pull this apart into constructor to make sure values are up to date

    // this.af.database.object(`/users/${this.authService.authState.uid}/stripeAccount/id`).subscribe((payerId) => {
    //   this.af.database.object(`/users/${this.list.shopper}/stripeAccount/id`).subscribe((destinationId) => {
    //     this.af.database.object(`/lists/${this.list.$key}/subtotal`).subscribe((subTotal) => {
    //       let total = parseFloat(subTotal.$value) + Number(this.tip);
    //       this.http.get(`https://rh-groceries-backend.herokuapp.com/api/pay/${payerId.$value}/${destinationId.$value}/${total}`).subscribe((value) => {

    //       });
    //     })

    //   });
    // });


    let total = parseFloat(this.submittedSubtotal) + Number(this.tip);
    this.http.get(`https://rh-groceries-backend.herokuapp.com/api/pay/${this.payerId}/${this.destinationId}/${total}`).subscribe((value) => {
      
    });




    let buyerHistory = new historyItem(-1 * this.tip);
    let shopperHistory = new historyItem(1 * this.tip);
    firebase.database().ref(`/lists/${this.list.$key}/shopper`).once("value").then((snapshot) => {
      this.af.database.list('users/' + this.authService.authState.uid + '/paymentHistory').push(buyerHistory);
      this.af.database.list('users/' + snapshot.val() + '/paymentHistory').push(shopperHistory);
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
      //console.log("submitting rating = " + this.tempRating + ", review = " + this.tempReview);
      this.reviewError = "";
      firebase.database().ref(`/users/${this.list.shopper}`).once("value").then((snapshot) => {
        let user = snapshot.val();
        let shopperRating = user.shopperRating;
        let shopperTotal = user.shopperTotal;
        let newShopperRating = ((shopperRating * shopperTotal) + this.tempRating) / (shopperTotal + 1);
        //console.log("previous rating: " + shopperRating + ", previous total: " + shopperTotal + ", new rating: " + newShopperRating);
        firebase.database().ref(`/users/${this.list.shopper}`).update({
          shopperRating: newShopperRating,
          shopperTotal: shopperTotal + 1
        }, (error) => {
          if (!error) {
            this.closeModal();
          }
        });
      });
    }

  }

}
