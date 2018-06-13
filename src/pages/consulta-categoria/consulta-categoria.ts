import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private formBuilder: FormBuilder, private categoriaProvider: CategoriaProvider, private toast: ToastController) {

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
      });*/
  }

  editar(categoria: any) {
    this.navCtrl.push('CadastroCategoriaPage', { categoria: categoria });
  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm(idCategoria) {
    const confirm = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Tem certeza que deseja excluir a categoria?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.categoriaProvider.remove(idCategoria)
              .then(() => {
                this.toast.create({ message: 'Categoria removida sucesso.', duration: 3000 }).present();
              })
              .catch(() => {
                this.toast.create({ message: 'Erro ao remover a categoria.', duration: 3000, position: 'botton' }).present();
              });
          }
        }
      ]
    });
    confirm.present();
  }

  remover(id) {
    /*let temGasto = this.categoriaProvider.checkCategoriaInGasto(id);
    if (temGasto) {
      this.showAlert('Não é possível excluir a categoria pois há gastos cadastrados na mesma.');
    }else {
      this.showConfirm(id);
    }*/
    this.showConfirm(id);
  }

}
