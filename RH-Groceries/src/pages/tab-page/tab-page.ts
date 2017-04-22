import { AuthService } from './../../providers/auth-service';
import { Login } from './../login/login';
import { HistoryHome } from './../history-home/history-home';
import { Profile } from './../profile/profile';
import { ShopHome } from './../shop-home/shop-home';
import { ListHome } from './../list-home/list-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tab-page',
  templateUrl: 'tab-page.html',
})
export class TabPage {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.tab1Root = ListHome;
    this.tab2Root = ShopHome;
    this.tab3Root = Profile;
    this.tab4Root = HistoryHome;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TabPage');
  }

  signout(){
    this.authService.signOut().then( () => {
      this.navCtrl.setRoot(Login);
    });
  }

}
