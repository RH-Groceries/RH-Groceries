import { AuthService } from './../../providers/auth-service';
import { TabPage } from './../tab-page/tab-page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile-setup',
  templateUrl: 'profile-setup.html',
})
export class ProfileSetup {

  public user = {
    name: "",
    address: "",
    phone: "",
    image: "",
    buyerRating: -1.0,
    shopperRating: -1.0
  };
  public imageUrl: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private authService: AuthService) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfileSetup');
    document.getElementById('phone').addEventListener('input', function (e: any) {
      var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

  saveProfile(form: HTMLFormElement) {
    this.user.name = this.authService.rfUser.name;
    firebase.database().ref().child('users').child(this.authService.authState.uid).set(this.user, (err) => {
      if (err) {
        //do something
      }
      else {
        this.navCtrl.setRoot(TabPage);
      }
    });
  }

  pickImage() {
    console.log("Opening image picker");
    let options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 50
    }

    this.imagePicker.getPictures(options).then((file_uris) => {
      this.imageUrl = file_uris[0];
      //do something
    }, (err) => {
      console.log('Picker failed (are you running in a mobile simulator?)');
    });
  }
}
