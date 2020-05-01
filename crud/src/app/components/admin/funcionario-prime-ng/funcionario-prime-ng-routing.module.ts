import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioPrimeNgComponent } from './funcionario-prime-ng.component';


const routes: Routes = [
  {
    path: '',
    component: FuncionarioPrimeNgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioPrimeNgRoutingModule { }
