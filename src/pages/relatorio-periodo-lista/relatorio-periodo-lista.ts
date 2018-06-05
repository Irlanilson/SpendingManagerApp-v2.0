import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-relatorio-periodo-lista',
  templateUrl: 'relatorio-periodo-lista.html',
})
export class RelatorioPeriodoListaPage {
  dados: any;
  titulo_relatorio = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dados = this.navParams.data.dados || { };
    this.titulo_relatorio = this.navParams.data.titulo_relatorio || { };
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
