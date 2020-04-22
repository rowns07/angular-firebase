import { Injectable } from '@angular/core';
import { IservicefirebaseService } from '../core/iservicefirebase.service';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends IservicefirebaseService<Funcionario> {

  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, 'funcionarios');
  }
}
