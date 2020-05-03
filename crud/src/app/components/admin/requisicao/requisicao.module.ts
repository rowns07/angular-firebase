import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { MovimentacaoComponent } from '../movimentacao/movimentacao.component';


@NgModule({
  declarations: [
    RequisicaoComponent,
    MovimentacaoComponent
  ],
  imports: [
    ComumModule,
    RequisicaoRoutingModule
  ]
})
export class RequisicaoModule { }
