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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.list = new Array<string>();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListHome');
  }

  addItem(): void {
    this.list.push(this.newItemValue);
    this.newItemValue = "";
  }

}
