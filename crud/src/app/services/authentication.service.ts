import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }
}
