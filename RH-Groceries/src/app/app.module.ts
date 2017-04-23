import { ImagePicker } from '@ionic-native/image-picker';
import { ProfileSetup } from './../pages/profile-setup/profile-setup';
import { AuthService } from './../providers/auth-service';
import { environment } from './../environments/environment.prod';
import { ShopHome } from './../pages/shop-home/shop-home';
import { Profile } from './../pages/profile/profile';
import { ListHome } from './../pages/list-home/list-home';
import { HistoryHome } from './../pages/history-home/history-home';
import { TabPage } from './../pages/tab-page/tab-page';
import { Login } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { BuyerListModal } from './../pages/buyer-list-modal/buyer-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Login,
    TabPage,
    HistoryHome,
    ListHome,
    Profile,
    ShopHome,
    ProfileSetup,
    BuyerListModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Login,
    TabPage,
    HistoryHome,
    ListHome,
    Profile,
    ShopHome,
    ProfileSetup,
    BuyerListModal
  ],
  providers: [
    AuthService,
    ImagePicker,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
