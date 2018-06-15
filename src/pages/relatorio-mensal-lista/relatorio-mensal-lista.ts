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
  lista_gastos: any[] = [];
  titulo_relatorio = '';
  x = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    //this.gastos = this.navParams.data.gastos || { };
    
    //APENAS PARA TESTE
    /*let gasto = new Gasto();
    gasto.id = 1;
    gasto.descricao = 'Teste'
    gasto.ano = 2017;
    gasto.mes = 1;
    gasto.dia = 1;
    gasto.categoria = 1;
    gasto.valor = 20.5;
    this.gastos.push(gasto);*/
    this.gastos.push({categoria: 'Cat 1', data: '02/02/2018', descricao: 'Teste 1', valor: 10.5, total_categoria: 10.5});
    this.gastos.push({categoria: 'Cat 2', data: '03/02/2018', descricao: 'Teste 2', valor: 5.5, total_categoria: 5.5});
    //FIM TESTE

    let itens: any[] = [];
    let tam = this.gastos.length;
    for (var i = 0; i < tam; i++) {
      itens.push({data: this.gastos[i].data, descricao: this.gastos[i].descricao, valor: this.gastos[i].valor});

      // se mudou a categoria ou se chegou ao fim da lista de gastos então adiciona na nova lista
      if ((i < tam-1 && this.gastos[i+1].categoria != this.gastos[i].categoria) || i == tam-1){
        this.lista_gastos.push({categoria: this.gastos[i].categoria, total_categoria: this.gastos[i].total_categoria, itens: itens});
        itens = [];
      }

      //Criar uma lista que contenha os atributos categoria (categoria) e itens (data, descricao, valor, total_categoria)
      //Tem q percorrer a lista de gastos com IFs para tirar a lógica da pagina e tratar aqui, a lista tem q ficar +/- da forma abaixo:
      /*
        lista_gastos = [{
            categoria: 'cat 1',
            total_categoria: 20,
            items: [{
              descricao: 'dCappuccino.jpg',
              data: 'Cappuccino',
              valor: '$3.00'
            }, {
              descricao: 'dCappuccino.jpg',
              data: 'Cappuccino',
              valor: '$3.00'
             }]
        }, {
            categoria: 'cat 2',
            total_categoria: 20,
            items: [{
              descricao: 'dCappuccino.jpg',
              data: 'Cappuccino',
              valor: '$3.00'
            }, {
              descricao: 'dCappuccino.jpg',
              data: 'Cappuccino',
              valor: '$3.00'
            }]
        }]
      */
    }

    this.titulo_relatorio = this.navParams.data.titulo_relatorio || { };
    console.log("AQUIIII");
    console.log(this.gastos);
  }

  ionViewDidLoad() {
    console.log(this.gastos);
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
