import { TabPage } from './../pages/tab-page/tab-page';
import { NavController } from 'ionic-angular';
import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { Rosefire } from 'rosefire/dist/js/rosefire.min.js';
import { Page } from "ionic-angular/navigation/nav-util";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

  public authState: FirebaseAuthState;
  private _rfUser: any;

  constructor(public auth$: AngularFireAuth) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get rfUser(): any {
    return this._rfUser;
  }

  signInWithRoseFire(): Observable<boolean> {
    return Observable.create(observer => {
      Rosefire.signIn(environment.registryToken, (error, rfUser: any) => {
          if (error) {
            // User not logged in!
            console.error(error);
            observer.next(false);
            observer.complete();
          }
          this._rfUser = rfUser;
          console.log(rfUser);
          this.auth$.login(rfUser.token, {
            method: AuthMethods.CustomToken,
            provider: AuthProviders.Custom,
          }).then((auth: FirebaseAuthState) => {
            observer.next(true);
            observer.complete();
          });
      });
    });
  }

  signOut(): Promise<void> {
    return this.auth$.logout();
  }

}
