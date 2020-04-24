import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: Observable<firebase.User>;
  constructor(private authService: AuthenticationService, private angularFireAuth: AngularFireAuth, public router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.authUser();
  }

  sair() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']));
  }


}
