import { UserInfoService } from './../../providers/user-info-service';
import { ListForShopperModal } from './../list-for-shopper-modal/list-for-shopper-modal';
import { ShoppingList } from './../../models/shopping-list';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

@IonicPage()
@Component({
  selector: 'page-shop-home',
  templateUrl: 'shop-home.html',
})
export class ShopHome {

  activeLists: ShoppingList[] = new Array<ShoppingList>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private af: AngularFire, private authService: AuthService, private userInfoService: UserInfoService) {
    const queryObservable = af.database.list('/lists', {
      query: {
        orderByChild: 'status',
        equalTo: 1
      }
    });

    queryObservable.subscribe((items) => {
      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].buyer === this.authService.authState.uid) items.splice(i, 1);
      }
      this.activeLists = items;
    });
    // this.activeLists = this.af.database.list('/lists');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShopHome');
  }

  viewBuyerList(list: ShoppingList): void {
    let buyer = this.userInfoService.getListCreatorName(list);
    let listForShopperModal = this.modalCtrl.create(ListForShopperModal, { "listData": list, "buyer": buyer });
    listForShopperModal.present();
  }

}
