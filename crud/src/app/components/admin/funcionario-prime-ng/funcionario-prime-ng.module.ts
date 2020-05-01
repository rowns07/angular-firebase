import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { FuncionarioPrimeNgRoutingModule } from './funcionario-prime-ng-routing.module';
import { FuncionarioPrimeNgComponent } from './funcionario-prime-ng.component';



@NgModule({
  declarations: [FuncionarioPrimeNgComponent],
  imports: [
    ComumModule,
    FuncionarioPrimeNgRoutingModule,
    CommonModule
  ]
})
export class FuncionarioPrimeNgModule { }
