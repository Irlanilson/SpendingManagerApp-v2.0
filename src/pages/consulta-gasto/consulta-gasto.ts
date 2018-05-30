import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoProvider } from './../../providers/gasto/gasto';
import { CategoriaProvider } from './../../providers/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-consulta-gasto',
  templateUrl: 'consulta-gasto.html',
})
export class ConsultaGastoPage {

  form: FormGroup;
  gasto: any;
  gastos: any[];
  anos: any[];
  meses: any[];
  categorias: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private categoriaProvider: CategoriaProvider,
    private formBuilder: FormBuilder, private gastoProvider: GastoProvider, private toast: ToastController) {

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      categoria: [''],
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

    this.categorias = [{ id:1, descricao:"Cat 1"}, { id:2, descricao:"Cat 2"}];
    /*
    this.categoriaProvider.getAll()
      .then((result: any[]) => {
        this.categorias = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias.', duration: 3000, position: 'botton' }).present();
      });
      */
  }

  buscarGastos(){
    this.gastoProvider.searchGastos(this.form.value)
      .then((result: any[]) => {
        this.gastos = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao pesquisar os gastos.', duration: 3000, position: 'botton' }).present();
      });
  }

}
