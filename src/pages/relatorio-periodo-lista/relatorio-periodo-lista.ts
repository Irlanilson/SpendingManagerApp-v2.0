import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-relatorio-periodo-lista',
  templateUrl: 'relatorio-periodo-lista.html',
})
export class RelatorioPeriodoListaPage {
  gastos: any;
  titulo_relatorio = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.gastos = this.navParams.data.gastos || { };
    this.titulo_relatorio = this.navParams.data.titulo_relatorio || { };
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
