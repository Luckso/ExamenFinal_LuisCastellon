import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Recorrido } from './recorrido';
import { Mensaje } from './mensaje';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  recoList = new BehaviorSubject([]);
  mensajeList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'other_db.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchRecorrido(): Observable<Recorrido[]> {
    return this.recoList.asObservable();
  }

  fetchMensaje(): Observable<Mensaje[]> {
    return this.mensajeList.asObservable();
  }

  getData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getRecorridos();
          this.getMensajes();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  getRecorridos() {
    return this.storage.executeSql('SELECT * FROM recorrido', []).then(res => {
      const items: Recorrido[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            actividad: res.rows.item(i).actividad,
            costo: res.rows.item(i).costo,
            detalle: res.rows.item(i).detalle,
            fecha: res.rows.item(i).fecha,
            tiempo: res.rows.item(i).tiempo,
          });
        }
      }
      this.recoList.next(items);
    });
  }

  getRecorrido(id) {
    return this.storage.executeSql('SELECT * FROM recorrido WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        actividad: res.rows.item(0).actividad,
        costo: res.rows.item(0).costo,
        detalle: res.rows.item(0).detalle,
        fecha: res.rows.item(0).fecha,
        tiempo: res.rows.item(0).tiempo,
      };
    });
  }

  getMensajes() {
    return this.storage.executeSql('SELECT * FROM mensaje', []).then(res => {
      const items: Mensaje[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            email: res.rows.item(i).email,
            mensaje: res.rows.item(i).mensaje,
            nombre: res.rows.item(i).nombre,
          });
        }
      }
      this.mensajeList.next(items);
    });
  }

  addMensaje(email, mensaje, nombre) {
    const data = [email, mensaje, nombre];
    // tslint:disable-next-line: max-line-length
    return this.storage.executeSql('INSERT INTO mensaje (email, mensaje, nombre) VALUES (?, ?, ?)', data);
  }

}
