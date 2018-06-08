import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoProvider } from './../../providers/gasto/gasto';
import { CategoriaProvider } from './../../providers/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-cadastro-gasto',
  templateUrl: 'cadastro-gasto.html',
})
export class CadastroGastoPage {

  title: string;
  form: FormGroup;
  gasto: any;
  categorias: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private gastoProvider: GastoProvider,
    private categoriaProvider: CategoriaProvider, private toast: ToastController) {

    this.gasto = this.navParams.data.gasto || { };
    this.createForm();

    this.setupPageTitle();
  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    // APENAS PARA TESTE
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

  private setupPageTitle() {
    this.title = this.navParams.data.gasto ? 'Alterando Gasto' : 'Novo Gasto';
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [this.gasto.id],
      descricao: [this.gasto.descricao, Validators.required],
      categoria: [this.gasto.categoria, Validators.required],
      data: [this.gasto.descricao, Validators.required],
      valor: [this.gasto.valor, Validators.required],
      eh_constante: [this.gasto.eh_constante]
    });
  }

  salvar() {
    if (this.form.valid) {
      this.gastoProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Gasto cadastrado/atualizado com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao cadastrar/atualizar o gasto.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}