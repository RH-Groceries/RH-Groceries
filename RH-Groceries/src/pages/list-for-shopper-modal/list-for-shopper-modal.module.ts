import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ListForShopperModal } from './list-for-shopper-modal';

@NgModule({
  declarations: [
    ListForShopperModal,
  ],
  imports: [
    IonicPageModule.forChild(ListForShopperModal),
  ],
  exports: [
    ListForShopperModal
  ]
})
export class ListForShopperModalModule {}
