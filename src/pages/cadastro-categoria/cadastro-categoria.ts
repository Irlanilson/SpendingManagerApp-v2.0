import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaProvider } from './../../providers/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-cadastro-categoria',
  templateUrl: 'cadastro-categoria.html',
})
export class CadastroCategoriaPage {

  title: string;
  form: FormGroup;
  categoria: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private categoriaProvider: CategoriaProvider,
    private toast: ToastController) {

    this.categoria = this.navParams.data.categoria || { };
    this.createForm();

    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.categoria ? 'Alterando categoria' : 'Nova categoria';
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [this.categoria.id],
      descricao: [this.categoria.descricao, Validators.required]
    });
  }

  salvar() {
    if (this.form.valid) {
      this.categoriaProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Categoria cadastrada/atualizada com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao cadastrar/atualizar a categoria.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
