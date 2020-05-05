import { NgModule } from '@angular/core';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';



@NgModule({
  declarations: [],
  imports: [
    ComumModule,
    ListaRoutingModule
  ]
})
export class ListaModule { }
