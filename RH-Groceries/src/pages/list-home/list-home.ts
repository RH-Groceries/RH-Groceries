import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-home',
  templateUrl: 'list-home.html',
})
export class ListHome {

  public list: Array<string>;
  public newItemValue: string;
  public buyerLists: Array<ShoppingList>; // This will be retrieved from firebase

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.list = new Array<string>();
    this.buyerLists = new Array<ShoppingList>();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListHome');
  }

  addItem(): void {
    this.list.push(this.newItemValue);
    this.newItemValue = "";
  }

  removeListItem(item: string): void {
    var index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }

  activateList(): void {
    var newList: ShoppingList = new ShoppingList();
    newList.items = this.list;
    this.list = new Array<string>();
    this.newItemValue = "";

    // Push to firebase

    // TEMP: Keep list for display
    this.buyerLists.push(newList);


  }

  removeBuyerList(list: ShoppingList): void {
    // Remove from firebase


    // TEMP: Remove list from array (for display)
    var index = this.buyerLists.indexOf(list);
    this.buyerLists.splice(index, 1);

  }

}
