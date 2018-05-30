import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadDatabasePage } from './upload-database';

@NgModule({
  declarations: [
    UploadDatabasePage,
  ],
  imports: [
    IonicPageModule.forChild(UploadDatabasePage),
  ],
})
export class UploadDatabasePageModule {}
