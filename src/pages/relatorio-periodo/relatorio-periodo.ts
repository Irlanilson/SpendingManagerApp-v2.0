import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoProvider } from './../../providers/gasto/gasto';

@IonicPage()
@Component({
  selector: 'page-relatorio-periodo',
  templateUrl: 'relatorio-periodo.html',
})
export class RelatorioPeriodoPage {

  form: FormGroup;
  gasto: any;
  gastos: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
      private gastoProvider: GastoProvider, private toast: ToastController) {

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      tipo: [''],
      data_inicial: [''],
      data_final: ['']
    });
  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    
  }

  relatorioPeriodo(){
    let datePipe = new DatePipe("en-US");
    let dataIni = datePipe.transform(this.form.value.data_inicial, 'dd/MM/yyyy');
    let dataFim = datePipe.transform(this.form.value.data_final, 'dd/MM/yyyy');

    let titulo_relatorio = 'Gastos de ' + dataIni + ' a ' + dataFim;
    this.navCtrl.push('RelatorioPeriodoListaPage', { gastos: this.gastos, titulo_relatorio: titulo_relatorio });
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
