import { Injectable } from '@angular/core';
import { Model } from './model';
import { Icrud } from './icrud';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export abstract class IservicefirebaseService<T extends Model> implements Icrud<T> {

  ref: AngularFirestoreCollection<T>;

  constructor(protected type: { new(): T; }, protected firestore: AngularFirestore, public path: string) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  get(id: string): Observable<T> {
    let doc = this.ref.doc<T>(id);
    return doc.get().pipe(map(snapshot => this.docToClass(snapshot)))
  }

  docToClass(snapshotDoc): T {
    let obj = {
      id: snapshotDoc.id,
      ...(snapshotDoc.data() as T)
    }
    let typed = plainToClass(this.type, obj)
    return typed;
  };

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }

  createOrUpdate(item: T): Promise<any> {
    let id = item.id;
    if (!item)
      return
    let obj = null;

    if (id) {
      return this.ref.doc(id).set(obj);
    }
    else
      return this.ref.add(obj).then(res => {
        obj.id = res.id; // Para salvar com o atributo id
        this.ref.doc(res.id).set(obj);
      });
  }

  delete(id: string): Promise<any> {
    return this.ref.doc(id).delete();
  }
}
