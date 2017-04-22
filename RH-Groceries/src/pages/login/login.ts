import { ProfileSetup } from './../profile-setup/profile-setup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Login');
  }

  login() {
    this.authService.signInWithRoseFire().subscribe(success => {
      if (success) {
        this.navCtrl.setRoot(ProfileSetup);
      } else {
        //Show error (rosefire should handle this though)
      }
    },
    error => {
      //Show error (rosefire should handle this though)
    });
  }

}
