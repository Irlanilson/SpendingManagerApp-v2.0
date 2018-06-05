import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class GastoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  formatNumber(value) {
    if (value < 10)
      return '0' + value;
    else
      return value;
  }
 
  public save(gasto: Gasto) {
    var data = new Date(gasto.data);
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();

    // se já existe atualiza, senão salva novo
    if (gasto.id){
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update gasto set descricao = ?, ano = ?, mes = ?, dia = ?,  categoria = ?, valor = ?, eh_constante = ? where id = ?';
          let data = [gasto.descricao, ano, mes, dia, gasto.categoria, gasto.valor, gasto.eh_constante, gasto.id];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }else{
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'insert into gasto (descricao) values (?, ?, ?, ?, ?, ?, ?)';
          let data = [gasto.descricao, ano, mes, dia, gasto.categoria, gasto.valor, gasto.eh_constante];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from gasto where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from gasto where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let gasto = new Gasto();
              gasto.id = item.id;
              gasto.descricao = item.descricao;
              gasto.ano = item.ano;
              gasto.mes = item.mes;
              gasto.dia = item.dia;
              gasto.categoria = item.categoria;
              gasto.valor = item.valor;
              gasto.eh_constante = item.eh_constante;
 
              return gasto;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      
      return db.executeSql('select * from gasto', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let gastos: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var gasto = data.rows.item(i);
              gastos.push(gasto);
            }
            return gastos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public searchGastos(objeto: any) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = '';
      let categoria = 0;

      if (objeto.categoria)
        categoria = objeto.categoria

      if (categoria == 0){
        sql = "select g.id, g.descricao, g.valor, g.ano, g.mes, g.dia, c.descricao as categoria from gasto g, categoria c"
          + " where g.categoria = c.id and ano = ? and mes = ? and g.categoria <> ? order by  c.descricao, dia asc";
      }else{
        sql = "select id, descricao, valor, ano, mes, dia from gasto where ano = ? and mes = ? and categoria = ? order by dia asc";
      }

      let dados = [objeto.ano, objeto.mes, categoria];

      return db.executeSql(sql, dados)
        .then((result: any) => {
          if (result.rows.length > 0) {
            let gastos: any[] = [];
            let data = '';

            for (var i = 0; i < result.rows.length; i++) {
              data = this.formatNumber(result.rows.item(i).dia) + "/" + this.formatNumber(result.rows.item(i).mes) +
                  "/" + result.rows.item(i).ano;
              gastos.push({
                  id: result.rows.item(i).id, descricao: result.rows.item(i).descricao,
                  data: data, valor: result.rows.item(i).valor, categoria: result.rows.item(i).categoria
                });
            }
            return gastos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}
 
export class Gasto {
  id: number;
  descricao: string;
  ano: number;
  mes: number;
  dia: number;
  categoria: number;
  valor: number;
  eh_constante: number;
  data: Date;
}
