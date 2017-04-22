import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileSetup } from './profile-setup';

@NgModule({
  declarations: [
    ProfileSetup,
  ],
  imports: [
    IonicPageModule.forChild(ProfileSetup),
  ],
  exports: [
    ProfileSetup
  ]
})
export class ProfileSetupModule {}
