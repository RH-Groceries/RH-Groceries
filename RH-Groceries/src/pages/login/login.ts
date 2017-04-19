import { TabPage } from './../tab-page/tab-page';
import { Register } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  createAccount() {
    this.navCtrl.push(Register);
  }

  login() {
    this.navCtrl.setRoot(TabPage);
  }

}
