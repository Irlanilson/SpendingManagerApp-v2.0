import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadDatabasePage } from './download-database';

@NgModule({
  declarations: [
    DownloadDatabasePage,
  ],
  imports: [
    IonicPageModule.forChild(DownloadDatabasePage),
  ],
})
export class DownloadDatabasePageModule {}
