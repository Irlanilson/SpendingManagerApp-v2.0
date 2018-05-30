import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroGastoPage } from './cadastro-gasto';

@NgModule({
  declarations: [
    CadastroGastoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroGastoPage),
  ],
})
export class CadastroGastoPageModule {}
