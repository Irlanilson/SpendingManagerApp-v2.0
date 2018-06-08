import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Gasto } from './../../providers/gasto/gasto';

@IonicPage()
@Component({
  selector: 'page-relatorio-mensal-lista',
  templateUrl: 'relatorio-mensal-lista.html',
})
export class RelatorioMensalListaPage {
  gastos: any[] = [];
  titulo_relatorio = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    //this.gastos = this.navParams.data.gastos || { };
    
    //APENAS PARA TESTE
    let gasto = new Gasto();
    gasto.id = 1;
    gasto.descricao = 'Teste'
    gasto.ano = 2017;
    gasto.mes = 1;
    gasto.dia = 1;
    gasto.categoria = 1;
    gasto.valor = 20.5;
    this.gastos.push(gasto);
    //FIM TESTE

    this.titulo_relatorio = this.navParams.data.titulo_relatorio || { };
    console.log("AQUIIII");
    console.log(this.gastos);
  }

  ionViewDidLoad() {
    console.log(this.gastos);
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
