import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    PrimengModule,
    FormsModule
  ]
})
export class ComumModule { }
