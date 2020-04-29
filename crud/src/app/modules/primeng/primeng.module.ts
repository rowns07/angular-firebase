import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    ButtonModule
  ],
  providers: [

  ]
})
export class PrimengModule { }
