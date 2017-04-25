import { AuthService } from './../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BuyerListModal } from './../buyer-list-modal/buyer-list';
import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-list-home',
  templateUrl: 'list-home.html',
})
export class ListHome {

  public list: Array<string>;
  public newItemValue: string;
  public buyerLists: ShoppingList[];
  public buyerListsObservable: FirebaseListObservable<ShoppingList[]>;
  public titleForItem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private af: AngularFire, private authService: AuthService) {
    this.buyerLists = new Array<ShoppingList>();
    this.list = new Array<string>();
    this.buyerListsObservable = this.af.database.list('/lists');

    const queryObservable = this.af.database.list('/lists', {
      query: {
        orderByChild: 'buyer',
        equalTo: this.authService.authState.uid
      }
    });
    console.log(queryObservable);
    queryObservable.subscribe( (shoppingLists) => {
      console.log("Shopping List: ", shoppingLists);
      this.buyerLists = shoppingLists;
    });

    console.log(this.buyerLists);
    // this.buyerLists = this.af.database.list(`/lists/${this.authService.authState.uid}`);
    // this.buyerLists.subscribe( (snapshot) => {
    //   this.titleForItem = snapshot.length + " Items"
    // });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListHome');
    console.log(this.buyerLists);
  }

  addItem(): void {
    this.list.push(this.newItemValue);
    this.newItemValue = "";
  }

  removeListItem(item: string): void {
    var index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }

  activateList(): void {
    // Push to firebase
    var newList: ShoppingList = new ShoppingList();
    newList.items = this.list;
    newList.itemsLeft = this.list;
    newList.buyer = this.authService.authState.uid;
    newList.subtotal = 0;
    newList.tip = 0;
    newList.status = 1;
    this.buyerListsObservable.push(newList);
    // var newItemKey =  this.buyerLists.push(newList).key;
    // var ref = firebase.database().ref().child(`/lists/${newItemKey}/items`);
    // this.list.forEach( (newItem) => {
    //   ref.push(newItem);
    // });


    this.list = new Array<string>();
    this.newItemValue = "";


  }

  removeBuyerList(list: ShoppingList): void {
    // Remove from firebase
    this.buyerListsObservable.remove(list.$key);
  }

  viewBuyerList(list: ShoppingList): void {
    let buyerListModal = this.modalCtrl.create(BuyerListModal, {"listData": list});
    buyerListModal.present();
  }

}
