import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upload-database',
  templateUrl: 'upload-database.html',
})
export class UploadDatabasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadDatabasePage');
  }

  uploadDatabase(){
    
  }

}
