import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the HistoryDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history-details',
  templateUrl: 'history-details.html',
})
export class HistoryDetails {

  public purchasedItemsForDisplay = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, public viewCtrl: ViewController) {
    let listKey = this.navParams.get("listKey");
    firebase.database().ref('lists/' + listKey).once("value").then((snapshot) => {
      console.log("list=", snapshot.val());
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


}
