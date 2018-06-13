import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoriaProvider {

  constructor(private dbProvider: DatabaseProvider) { }
 
  public save(categoria: Categoria) {
    // se já existe atualiza, senão salva nova
    if (categoria.id){
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update categoria set descricao = ? where id = ?';
          let data = [categoria.descricao, categoria.id];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }else{
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'insert into categoria (descricao) values (?)';
          let data = [categoria.descricao];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from categoria where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from categoria where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let categoria = new Categoria();
              categoria.id = item.id;
              categoria.descricao = item.descricao;
 
              return categoria;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public checkCategoriaInGasto(idCategoria: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from gasto where categoria = ?';
        let data = [idCategoria];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              return true;
            }
 
            return false;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from categoria order by descricao', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let categorias: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var categoria = data.rows.item(i);
              categorias.push(categoria);
            }
            return categorias;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}
 
export class Categoria {
  id: number;
  descricao: string;
}
