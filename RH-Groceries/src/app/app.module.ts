import { ShopHome } from './../pages/shop-home/shop-home';
import { Profile } from './../pages/profile/profile';
import { ListHome } from './../pages/list-home/list-home';
import { HistoryHome } from './../pages/history-home/history-home';
import { TabPage } from './../pages/tab-page/tab-page';
import { Register } from './../pages/register/register';
import { Login } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Login,
    Register,
    TabPage,
    HistoryHome,
    ListHome,
    Profile,
    ShopHome
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Login,
    Register,
    TabPage,
    HistoryHome,
    ListHome,
    Profile,
    ShopHome
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
