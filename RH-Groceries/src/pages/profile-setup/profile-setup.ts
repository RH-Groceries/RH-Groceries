import { TabPage } from './../tab-page/tab-page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-profile-setup',
  templateUrl: 'profile-setup.html',
})
export class ProfileSetup {

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfileSetup');
  }

  saveProfile() {
    this.navCtrl.setRoot(TabPage);
  }

  pickImage() {
    console.log("Opening image picker");
    let options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 50
    }

    this.imagePicker.getPictures(options).then( (file_uris) => {
      //do stuff
    }, (err) => {
      console.log('Picker failed (are you running in a mobile simulator?)');
    });
  }
}
