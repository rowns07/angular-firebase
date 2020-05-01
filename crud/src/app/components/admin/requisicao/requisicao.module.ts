import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';


@NgModule({
  declarations: [RequisicaoComponent],
  imports: [
    ComumModule,
    RequisicaoRoutingModule
  ]
})
export class RequisicaoModule { }
