import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListHome } from './list-home';

@NgModule({
  declarations: [
    ListHome,
  ],
  imports: [
    IonicPageModule.forChild(ListHome),
  ],
  exports: [
    ListHome
  ]
})
export class ListHomeModule {}
