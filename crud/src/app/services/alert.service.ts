import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  titulo: string;
  mensagem: string;

  constructor() { }

  alertSuccess(titulo?: string, mensagem?: string, icon?: string) {
    Swal.fire(titulo, mensagem, 'success');
  }

  errorAlert(titulo?: string, mensagem?: string, icon?: string) {
    Swal.fire(titulo, mensagem, 'error');
  }

  infoAlert(titulo?: string, mensagem?: string, icon?: string) {
    Swal.fire(titulo, mensagem, 'info');
  }

}
