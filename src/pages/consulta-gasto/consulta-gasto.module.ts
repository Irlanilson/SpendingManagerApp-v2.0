import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaGastoPage } from './consulta-gasto';

@NgModule({
  declarations: [
    ConsultaGastoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaGastoPage),
  ],
})
export class ConsultaGastoPageModule {}
