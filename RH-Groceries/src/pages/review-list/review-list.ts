import { AuthService } from './../../providers/auth-service';
import { Review } from './../../models/review';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ReviewList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review-list',
  templateUrl: 'review-list.html',
})
export class ReviewList {

  public reviewStream: FirebaseListObservable<Review>;
  public reviewType: string = "";
  public reviewee: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire, public authService: AuthService, public viewCtrl: ViewController) {
    //TODO: switch between buyer and Shopper reviews
    this.reviewType = this.navParams.get("reviewType");
    this.reviewee = this.navParams.get("reviewee");
    this.reviewStream = this.af.database.list(`/users/${this.reviewee}/${this.reviewType}Reviews`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewList');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
