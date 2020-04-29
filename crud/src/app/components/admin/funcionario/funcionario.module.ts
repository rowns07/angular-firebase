import { NgModule } from '@angular/core';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';



@NgModule({
  declarations: [FuncionarioComponent],
  imports: [
    ComumModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule { }
