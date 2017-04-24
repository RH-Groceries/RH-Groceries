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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.list = this.navParams.get("listData");
    this.items = this.list.items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListForShopperModal');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

}
