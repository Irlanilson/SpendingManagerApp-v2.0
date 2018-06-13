import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
    private formBuilder: FormBuilder, private gastoProvider: GastoProvider, private toast: ToastController, public alertCtrl: AlertController) {

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

    // APENAS PARA TESTE
    this.anos = [{valor: '2017', id: 2017}, {valor: '2018', id: 2018}]

    this.categorias = [{ id:1, descricao:"Cat 1"}, { id:2, descricao:"Cat 2"}];
    // FIM TESTE
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

  editar(gasto: any) {
    this.navCtrl.push('CadastroGastoPage', { gasto: gasto });
  }

  showConfirm(idGasto) {
    const confirm = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Tem certeza que deseja excluir o gasto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.gastoProvider.remove(idGasto)
              .then(() => {
                this.toast.create({ message: 'Gasto removido sucesso.', duration: 3000 }).present();
              })
              .catch(() => {
                this.toast.create({ message: 'Erro ao remover o gasto.', duration: 3000, position: 'botton' }).present();
              });
          }
        }
      ]
    });
    confirm.present();
  }

  remover(id) {
    this.showConfirm(id);
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
