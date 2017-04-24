import { TabPage } from './../tab-page/tab-page';
import { ProfileSetup } from './../profile-setup/profile-setup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    if (this.authService.authState) {
      this.navCtrl.setRoot(TabPage);
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Login');
  }

  login() {
    this.authService.signInWithRoseFire().subscribe(success => {
      if (success) {
        firebase.database().ref('/users/' + this.authService.authState.uid).once('value').then((snapshot) => {
          if (snapshot.val()) {
            this.navCtrl.setRoot(TabPage);
          }
          else {
            this.navCtrl.setRoot(ProfileSetup);
          }
        });
      } else {
        //Show error (rosefire should handle this though)
      }
    },
      error => {
        //Show error (rosefire should handle this though)
      });
  }

}
