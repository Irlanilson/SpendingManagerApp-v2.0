import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-download-database',
  templateUrl: 'download-database.html',
})
export class DownloadDatabasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DownloadDatabasePage');
  }

  downloadDatabase(){

  }

}
