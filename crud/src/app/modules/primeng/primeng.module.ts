import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';



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
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule
  ],
  providers: [

  ]
})
export class PrimengModule { }
