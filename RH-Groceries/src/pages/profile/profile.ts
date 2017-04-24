import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  public user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    firebase.database().ref('/users/' + authService.userKey).once('value').then( (snapshot) => {
      this.user = snapshot.val();
      //console.log(snapshot.val());
      // ...
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Profile');
  }

}
