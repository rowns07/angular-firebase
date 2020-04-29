import { NgModule } from '@angular/core';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';



@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    DepartamentoRoutingModule,
    ComumModule
  ]
})
export class DepartamentoModule { }
