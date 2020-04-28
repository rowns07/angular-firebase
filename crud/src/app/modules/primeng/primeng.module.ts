import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule
  ],
  exports: [
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule
  ],
  providers: [

  ]
})
export class PrimengModule { }
