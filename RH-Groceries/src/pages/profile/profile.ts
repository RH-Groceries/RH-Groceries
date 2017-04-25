import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  public user;
  public editing: boolean = false;
  private backupAddr: string;
  private backupPhone: string;
  public imageUrl: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, public authService: AuthService) {
    firebase.database().ref('/users/' + authService.authState.uid).once('value').then((snapshot) => {
      this.user = snapshot.val();
      //console.log(snapshot.val());
      // ...
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Profile');
  }

  edit() {
    this.editing = true;
    this.backupAddr = this.user.address;
    this.backupPhone = this.user.phone;
    setTimeout(function () {
      document.getElementById('phone').addEventListener('input', function (e: any) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      });
    }, 0);
  }

  cancel() {
    this.user.address = this.backupAddr;
    this.user.phone = this.backupPhone;
    this.editing = false;
  }

  save() {
    if (this.user.address === '' || this.user.phone === ''){
      this.cancel();
      return;
    }
    var strippedUser = {
      phone: this.user.phone,
      address: this.user.address
    }
    firebase.database().ref().child('users').child(this.authService.authState.uid).update(strippedUser, (err) => {
      if (err) {
        //do something
      }
      else {
        this.editing = false;
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
