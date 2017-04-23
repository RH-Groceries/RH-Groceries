import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { BuyerListModal } from './buyer-list';

@NgModule({
  declarations: [
    BuyerListModal,
  ],
  imports: [
    IonicPageModule.forChild(BuyerListModal),
  ],
  exports: [
    BuyerListModal
  ]
})
export class BuyerListModule {}
