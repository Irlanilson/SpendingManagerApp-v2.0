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

  public listaAnos() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      
      return db.executeSql('select distinct(ano) from gasto order by ano desc', [])
        .then((result: any) => {
          if (result.rows.length > 0) {
            let anos: any[] = [];
            for (var i = 0; i < result.rows.length; i++) {
              anos.push({id: result.rows.item(i).ano, valor: result.rows.item(i).ano});
            }

            return anos;
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

  public relatorioMensal(objeto: any) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let gastos: any[] = [];
      let sql = '';
      let tipoGasto = 0;
      let data = '';
      let totalMes = 0;
      let totalCategoria = 0;

      if (objeto.tipo)
        tipoGasto = objeto.tipo

      if (tipoGasto == 2) {//Todos
        sql = "select g.*, c.descricao as categoria from gasto g, categoria c where ano = ? and mes = ?"
          + " and g.categoria = c.id order by c.descricao, dia";
      } else if (tipoGasto == 1) {//Constante
        sql = "select g.*, c.descricao as categoria from gasto g, categoria c where ano = ? and mes = ? and eh_constante = 'true'"
          + " and g.categoria = c.id order by c.descricao, dia";
      } else if (tipoGasto == 0) {//Não constante
        sql = "select g.*, c.descricao as categoria from gasto g, categoria c where ano = ? and mes = ? and eh_constante = 'false'"
          + " and g.categoria = c.id order by c.descricao, dia";
      }

      let dados = [objeto.ano, objeto.mes];

      return db.executeSql(sql, dados)
        .then((result: any) => {
          if (result.rows.length > 0) {
            for (var i = 0; i < result.rows.length; i++) {
              totalMes = totalMes + result.rows.item(i).valor;
              totalCategoria = totalCategoria + result.rows.item(i).valor;
              data = this.formatNumber(result.rows.item(i).dia) + "/" + this.formatNumber(result.rows.item(i).mes) +
                "/" + result.rows.item(i).ano;

              gastos.push({
                id: result.rows.item(i).id, ano: result.rows.item(i).ano,
                mes: result.rows.item(i).mes, dia: result.rows.item(i).dia,
                data: data, categoria: result.rows.item(i).categoria, descricao: result.rows.item(i).descricao,
                valor: result.rows.item(i).valor, eh_constante: result.rows.item(i).eh_constante,
                total_categoria: totalCategoria, total_mes: totalMes
              });

              // Condicional para zerar o total da categoria
              if (i < result.rows.length - 1 && (result.rows.item(i + 1).categoria != result.rows.item(i).categoria ||
                result.rows.item(i + 1).mes != result.rows.item(i).mes)) {
                totalCategoria = 0;
              }
            }
            return gastos;
          } else {
            return gastos;
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public relatorioMensalPeriodo(objeto: any) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let gastos: any[] = [];
      let sql = '';
      let tipoGasto = 0;
      let data = '';
      let totalMes = 0;
      let totalCategoria = 0;

      let data1 = new Date(objeto.data_inicial);
      let dia1 = data1.getDate();
      let mes1 = data1.getMonth() + 1;
      let ano1 = data1.getFullYear();

      let data2 = new Date(objeto.data_final);
      let dia2 = data2.getDate();
      let mes2 = data2.getMonth() + 1;
      let ano2 = data2.getFullYear();

      if (objeto.tipo)
        tipoGasto = objeto.tipo

      if (tipoGasto == 2) {//Todos
        sql = "select g.*, c.descricao as categoria from gasto g, categoria c where ano between ? and ?"
          + " and mes between ? and ? and dia between ? and ?"
          + " and g.categoria = c.id order by c.descricao, dia";
      } else if (tipoGasto == 1) {//Constante
        sql = "select g.*, c.descricao as categoria from gasto g, categoria c where ano between ? and ?"
          + " and mes between ? and ? and eh_constante = 'true'"
          + " and dia between ? and ? and g.categoria = c.id order by c.descricao, dia";
      } else if (tipoGasto == 0) {//Não constante
        sql = "select g.*, c.descricao as categoria from gasto g, categoria c where ano between ? and ?"
          + " and mes between ? and ? and eh_constante = 'false'"
          + " and dia between ? and ? and g.categoria = c.id order by c.descricao, dia";
      }

      let dados = [ano1, ano2, mes1, mes2, dia1, dia2];

      return db.executeSql(sql, dados)
        .then((result: any) => {
          if (result.rows.length > 0) {
            for (var i = 0; i < result.rows.length; i++) {
              totalMes = totalMes + result.rows.item(i).valor;
              totalCategoria = totalCategoria + result.rows.item(i).valor;
              data = this.formatNumber(result.rows.item(i).dia) + "/" + this.formatNumber(result.rows.item(i).mes) +
                "/" + result.rows.item(i).ano;

              gastos.push({
                id: result.rows.item(i).id, ano: result.rows.item(i).ano,
                mes: result.rows.item(i).mes, dia: result.rows.item(i).dia,
                data: data, categoria: result.rows.item(i).categoria, descricao: result.rows.item(i).descricao,
                valor: result.rows.item(i).valor, eh_constante: result.rows.item(i).eh_constante,
                total_categoria: totalCategoria, total_mes: totalMes
              });

              // Condicional para zerar o total da categoria
              if (i < result.rows.length - 1 && (result.rows.item(i + 1).categoria != result.rows.item(i).categoria ||
                result.rows.item(i + 1).mes != result.rows.item(i).mes)) {
                totalCategoria = 0;
              }
            }
            return gastos;
          } else {
            return gastos;
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
