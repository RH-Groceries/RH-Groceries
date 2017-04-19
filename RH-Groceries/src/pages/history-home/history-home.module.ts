import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryHome } from './history-home';

@NgModule({
  declarations: [
    HistoryHome,
  ],
  imports: [
    IonicPageModule.forChild(HistoryHome),
  ],
  exports: [
    HistoryHome
  ]
})
export class HistoryHomeModule {}
