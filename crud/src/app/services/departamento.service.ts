import { Injectable } from '@angular/core';
import { IservicefirebaseService } from '../core/iservicefirebase.service';
import { Departamento } from '../models/departamento.model';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends IservicefirebaseService<Departamento> {

  constructor(firestore:AngularFirestore) { 
    super(Departamento,firestore,'departamentos');
  }
}
