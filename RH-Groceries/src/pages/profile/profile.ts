import { User } from './../../models/user';
import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { RatingModule } from "ngx-rating";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  public user: User;
  public editing: boolean = false;
  public loadingImage: boolean = false;
  public tempPhotoUrl: string;
  private backupAddr: string;
  private backupPhone: string;
  private photo: File;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    firebase.database().ref('/users/' + authService.authState.uid).on("value", (snapshot) => {
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
    this.tempPhotoUrl = "";
    this.photo = null;
    this.editing = false;
  }

  save() {
    if (this.user.address === '' || this.user.phone === '') {
      this.cancel();
      return;
    }
    var strippedUser = {
      phone: this.user.phone,
      address: this.user.address,
      image: this.user.image
    }
    if (this.photo && this.tempPhotoUrl) {
      this.loadingImage = true;
      const metadata = { "content-type": this.photo.type }
      const storageRef: firebase.storage.Reference = firebase.storage().ref().child("photos").child(this.authService.authState.uid);
      const uploadTask: firebase.storage.UploadTask = storageRef.put(this.photo, metadata);
      uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        const downloadUrl = uploadSnapshot.downloadURL;
        strippedUser.image = downloadUrl;
        firebase.database().ref().child('users').child(this.authService.authState.uid).update(strippedUser, (err) => {
          this.editing = false;
          this.loadingImage = false;
          this.photo = null;
          this.tempPhotoUrl = "";
        });
      });
    }
    else {
      firebase.database().ref().child('users').child(this.authService.authState.uid).update(strippedUser, (err) => {
        this.editing = false;
      });
    }


  }

  photoSelected(event: any) {
    this.loadingImage = true;
    this.photo = event.target.files[0];
    const metadata = { "content-type": this.photo.type }
    const storageRef: firebase.storage.Reference = firebase.storage().ref().child("photos").child(this.authService.authState.uid + "temp");
    const uploadTask: firebase.storage.UploadTask = storageRef.put(this.photo, metadata);
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      const downloadUrl = uploadSnapshot.downloadURL;
      this.tempPhotoUrl = downloadUrl;
      this.loadingImage = false;
    });
  }

}
