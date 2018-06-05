import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-relatorio-mensal-lista',
  templateUrl: 'relatorio-mensal-lista.html',
})
export class RelatorioMensalListaPage {
  dados: any;
  titulo_relatorio = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dados = this.navParams.data.dados || { };
    this.titulo_relatorio = this.navParams.data.titulo_relatorio || { };
    console.log('MES->'+this.dados.mes);
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
