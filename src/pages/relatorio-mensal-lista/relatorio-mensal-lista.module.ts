import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatorioMensalListaPage } from './relatorio-mensal-lista';

@NgModule({
  declarations: [
    RelatorioMensalListaPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatorioMensalListaPage),
  ],
})
export class RelatorioMensalListaPageModule {}
