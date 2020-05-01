import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    DropdownModule
  ],
  exports: [
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [

  ]
})
export class PrimengModule { }
