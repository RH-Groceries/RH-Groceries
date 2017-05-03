import { FirebaseObjectObservable, AngularFire, FirebaseListObservable } from 'angularfire2';
import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

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

  public itemsObservable: FirebaseListObservable<Array<string>>;
  public purchasedItemsObservable: FirebaseListObservable<Array<string>>;
  public itemsForDisplay: Array<string>;
  public purchasedItemsForDisplay: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private authService: AuthService, private af: AngularFire) {
    this.list = this.navParams.get("listData");
    this.items = this.list.items;
    this.nameForUser = this.authService.rfUser.name;

    this.shopper = this.af.database.object(`/users/${this.list.shopper}`);

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
    // console.log('ionViewDidLoad BuyerList');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  confirmShopper(): void {
    this.af.database.object(`/lists/${this.list.$key}/status`).set(3);
    this.closeModal();
  }

}
