import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { BuyerList } from './buyer-list';

@NgModule({
  declarations: [
    BuyerList,
  ],
  imports: [
    IonicPageModule.forChild(BuyerList),
  ],
  exports: [
    BuyerList
  ]
})
export class BuyerListModule {}
