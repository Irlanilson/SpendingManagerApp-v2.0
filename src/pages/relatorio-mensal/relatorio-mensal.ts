import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoProvider } from './../../providers/gasto/gasto';

@IonicPage()
@Component({
  selector: 'page-relatorio-mensal',
  templateUrl: 'relatorio-mensal.html',
})
export class RelatorioMensalPage {

  form: FormGroup;
  gasto: any;
  gastos: any[];
  anos: any[];
  meses: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
      private gastoProvider: GastoProvider, private toast: ToastController) {

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      tipo: [''],
      ano: [''],
      mes: ['']
    });
  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    this.meses = [
      {valor: 'Janeiro', id: 1}, {valor: 'Fevereiro', id: 2},
      {valor: 'Março', id: 3}, {valor: 'Abril', id: 4},
      {valor: 'Maio', id: 5}, {valor: 'Junho', id: 6},
      {valor: 'Julho', id: 7}, {valor: 'Agosto', id: 8},
      {valor: 'Setembro', id: 9}, {valor: 'Outubro', id: 10},
      {valor: 'Novembro', id: 11}, {valor: 'Dezembro', id: 12}
    ];

    this.anos = [{valor: '2017', id: 2017}, {valor: '2018', id: 2018}]

  }

  relatorioMensal(){
    let titulo_relatorio = 'Relatório Mensal ' + this.meses[this.form.value.mes-1].valor + " de " + this.form.value.ano;
    this.navCtrl.push('RelatorioMensalListaPage', { dados: this.form.value, titulo_relatorio: titulo_relatorio });
    /*
    this.gastoProvider.searchGastos(this.form.value)
      .then((result: any[]) => {
        this.gastos = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao buscar os dados.', duration: 3000, position: 'botton' }).present();
      });*/
  }

}
