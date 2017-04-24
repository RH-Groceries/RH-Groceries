import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.list = this.navParams.get("listData");
    this.items = this.list.items;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BuyerList');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

}
