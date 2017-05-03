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
  public waitingLists: ShoppingList[];
  public inProgressLists: ShoppingList[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private af: AngularFire, private authService: AuthService) {
    this.buyerLists = new Array<ShoppingList>();
    this.list = new Array<string>();
    this.waitingLists = new Array<ShoppingList>();
    this.inProgressLists = new Array<ShoppingList>();
    this.buyerListsObservable = this.af.database.list('/lists');

    const queryActiveObservable = this.af.database.list('/lists', {
      query: {
        orderByChild: 'status',
        equalTo: 1
      }
    });

    queryActiveObservable.subscribe( (shoppingLists) => {
      for (let i = shoppingLists.length - 1; i >= 0; i--) {
        if (shoppingLists[i].buyer !== this.authService.authState.uid) shoppingLists.splice(i, 1);
      }
      this.buyerLists = shoppingLists;
    });

    const queryWaitingObservable = this.af.database.list('/lists', {
      query: {
        orderByChild: 'status',
        equalTo: 2
      }
    });


    queryWaitingObservable.subscribe( (shoppingLists) => {
      for (let i = shoppingLists.length - 1; i >= 0; i--) {
        if (shoppingLists[i].buyer !== this.authService.authState.uid) shoppingLists.splice(i, 1);
      }
      this.waitingLists = shoppingLists;
    });

    const queryInProgressObservable = this.af.database.list('/lists', {
      query: {
        orderByChild: 'status',
        equalTo: 3
      }
    });

    queryInProgressObservable.subscribe( (shoppingLists) => {
      for (let i = shoppingLists.length - 1; i >= 0; i--) {
        if (shoppingLists[i].buyer !== this.authService.authState.uid) shoppingLists.splice(i, 1);
      }
      this.inProgressLists = shoppingLists;
    });

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
