import { historyItem } from './../../models/history-item';
import { AuthService } from './../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history-home',
  templateUrl: 'history-home.html',
})
export class HistoryHome {

  public historyList: historyItem[];
  public totalSpent: Number;
  public totalMade: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire, private authService: AuthService) {
    let date = new Date();
    let dateString = date.toString();
    let returnedDate = new Date(dateString);
    this.totalSpent = 0.00;
    this.totalMade = 0.00;
    let historyObservable = this.af.database.list('users/' + authService.authState.uid + '/paymentHistory', {
      query: {
        orderByChild: 'sortTime'
      }
    });
    historyObservable.subscribe((inList) => {
      this.historyList = inList.reverse();
      for (var i = inList.length - 1; i >= 0; i--) {
        if (inList[i].total < 0) {
          this.totalSpent += inList[i].total;
        }
        else if (inList[i].total > 0) {
          this.totalMade += inList[i].total;
        }
      }
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HistoryHome');
  }

}
