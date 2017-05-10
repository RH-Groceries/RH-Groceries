import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewList } from './review-list';

@NgModule({
  declarations: [
    ReviewList,
  ],
  imports: [
    IonicPageModule.forChild(ReviewList),
  ],
  exports: [
    ReviewList
  ]
})
export class ReviewListModule {}
