import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PainelComponent } from './admin/painel/painel.component';


const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  }, {
    path: 'admin/painel',
    component: PainelComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
