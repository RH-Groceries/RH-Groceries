import { Http } from '@angular/http';
import { AuthService } from './../../providers/auth-service';
import { TabPage } from './../tab-page/tab-page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { User } from "../../models/user";


@IonicPage()
@Component({
  selector: 'page-profile-setup',
  templateUrl: 'profile-setup.html',
})
export class ProfileSetup {

  public user: User;
  public loadingImage: boolean = false;
  public tempPhotoUrl: string;
  private photo: File;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private http: Http) {
    this.user = new User();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfileSetup');
    document.getElementById('phone').addEventListener('input', function (e: any) {
      var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

  saveProfile(form: HTMLFormElement) {

    //${this.authService.rfUser.name}
    this.http.get(`https://rh-groceries-backend.herokuapp.com/api/create/${this.authService.authState.uid}/${this.authService.authState.uid}@rose-hulman.edu`).subscribe((value) => {

    });

    this.user.name = this.authService.rfUser.name;
    if (this.photo && this.tempPhotoUrl) {
      this.loadingImage = true;
      const metadata = { "content-type": this.photo.type }
      const storageRef: firebase.storage.Reference = firebase.storage().ref().child("photos").child(this.authService.authState.uid);
      const uploadTask: firebase.storage.UploadTask = storageRef.put(this.photo, metadata);
      uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        const downloadUrl = uploadSnapshot.downloadURL;
        this.user.image = downloadUrl;
        firebase.database().ref().child('users').child(this.authService.authState.uid).set(this.user, (err) => {
          this.loadingImage = false;
          this.navCtrl.setRoot(TabPage);
        });
      });
    }
    else {
      firebase.database().ref().child('users').child(this.authService.authState.uid).set(this.user, (err) => {
        this.navCtrl.setRoot(TabPage);
      });
    }

  }

  photoSelected(event: any) {
    this.photo = event.target.files[0];
    if (this.photo) {
      this.loadingImage = true;
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

  removePhoto() {
    this.tempPhotoUrl = "";
    this.photo = null;
  }
}
