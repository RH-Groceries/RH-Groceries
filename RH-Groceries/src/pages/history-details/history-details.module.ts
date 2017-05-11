import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryDetails } from './history-details';

@NgModule({
  declarations: [
    HistoryDetails,
  ],
  imports: [
    IonicPageModule.forChild(HistoryDetails),
  ],
  exports: [
    HistoryDetails
  ]
})
export class HistoryDetailsModule {}
