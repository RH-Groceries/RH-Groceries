import { HistoryDetails } from './../pages/history-details/history-details';
import { ReviewList } from './../pages/review-list/review-list';
import { AuthService } from './../providers/auth-service';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BuyerListModal } from './../pages/buyer-list-modal/buyer-list';
import { ShopHome } from './../pages/shop-home/shop-home';
import { Profile } from './../pages/profile/profile';
import { ListHome } from './../pages/list-home/list-home';
import { HistoryHome } from './../pages/history-home/history-home';
import { TabPage } from './../pages/tab-page/tab-page';
import { Login } from './../pages/login/login';
import { ProfileSetup } from './../pages/profile-setup/profile-setup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RatingModule } from 'ngx-rating';
import { AngularFireModule } from 'angularfire2';
import { ListForShopperModal } from "../pages/list-for-shopper-modal/list-for-shopper-modal";
import { UserInfoService } from "../providers/user-info-service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    Login,
    TabPage,
    HistoryHome,
    ListHome,
    Profile,
    ShopHome,
    ProfileSetup,
    BuyerListModal,
    ListForShopperModal,
    ReviewList,
    HistoryDetails
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RatingModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    TabPage,
    HistoryHome,
    ListHome,
    Profile,
    ShopHome,
    ProfileSetup,
    BuyerListModal,
    ListForShopperModal,
    ReviewList,
    HistoryDetails
  ],
  providers: [
    AuthService,
    UserInfoService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
