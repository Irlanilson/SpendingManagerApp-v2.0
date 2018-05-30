import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaProvider } from './../../providers/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-consulta-categoria',
  templateUrl: 'consulta-categoria.html',
})
export class ConsultaCategoriaPage {

  categoria: any;
  categorias: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private categoriaProvider: CategoriaProvider, private toast: ToastController) {

  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    //this.categorias = [{ id:1, descricao:"Cat 1"}, { id:2, descricao:"Cat 2"}];
    
    this.categoriaProvider.getAll()
      .then((result: any[]) => {
        this.categorias = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias.', duration: 3000, position: 'botton' }).present();
      });
  }

}
