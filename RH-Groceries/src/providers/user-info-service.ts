import { ShoppingList } from './../models/shopping-list';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserInfoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserInfoService {

  constructor(private af: AngularFire) {
  }

  getListCreatorName(list: ShoppingList): FirebaseObjectObservable<any> {
    return this.af.database.object(`/users/${list.buyer}`)
  }

}
