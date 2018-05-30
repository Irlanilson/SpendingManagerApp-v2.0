import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { AddDataPage } from '../pages/add-data/add-data';
import { CadastroCategoriaPage } from '../pages/cadastro-categoria/cadastro-categoria';
import { CadastroGastoPage } from '../pages/cadastro-gasto/cadastro-gasto';
import { ConsultaCategoriaPage } from '../pages/consulta-categoria/consulta-categoria';
import { ConsultaGastoPage } from '../pages/consulta-gasto/consulta-gasto';
import { DownloadDatabasePage } from '../pages/download-database/download-database';
import { UploadDatabasePage } from '../pages/upload-database/upload-database';
import { DatabaseProvider } from '../providers/database/database'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  public rootPage;
  public homePage;
  public aboutPage;
  public addPage;
  menu: any[];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private http: Http, dbProvider: DatabaseProvider) {
    
    this.rootPage = HomePage;
    this.homePage = HomePage;
    this.aboutPage = AboutPage;
    this.addPage = AddDataPage;

    let localData = http.get('assets/menu.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.menu = data;
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Criando o banco de dados
      dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          splashScreen.hide();
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          splashScreen.hide();
        });
    });
  }

  toggleSection(i) {
    this.menu[i].open = !this.menu[i].open;
  }
 
  toggleItem(i, j) {
    this.menu[i].children[j].open = !this.menu[i].children[j].open;
  }

  openPage(page){
    this.rootPage = page;
  }
}

