import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopHome } from './shop-home';

@NgModule({
  declarations: [
    ShopHome,
  ],
  imports: [
    IonicPageModule.forChild(ShopHome),
  ],
  exports: [
    ShopHome
  ]
})
export class ShopHomeModule {}
