import { Injectable } from '@angular/core';
import { IservicefirebaseService } from '../core/iservicefirebase.service';
import { Requisicao } from '../models/requisicao.model';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService extends IservicefirebaseService<Requisicao> {

  constructor(firestore: AngularFirestore) {
    super(Requisicao, firestore, 'requisicoes');
  }
}
