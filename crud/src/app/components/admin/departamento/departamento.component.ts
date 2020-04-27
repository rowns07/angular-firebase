import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { AlertService } from 'src/app/services/alert.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamentos$: Observable<Departamento[]>;
  edit: boolean;
  displayDialogDepartamento: boolean;
  form: FormGroup;

  constructor(private departamentoService: DepartamentoService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list();
    this.configForm();
  }

  configForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('')
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogDepartamento = true;
  }

  selecionarDepartamento(departamento: Departamento) {
    this.edit = true;
    this.displayDialogDepartamento = false;
    this.form.setValue(departamento);
  }

  save() {
    this.departamentoService.createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogDepartamento = true;
        this.alertService.alertSuccess(`Departamento ${this.edit ? 'salvo' : 'atualizado'} com sucesso`, '', 'success')
      })
      .catch((erro) => {
        this.displayDialogDepartamento = false;
        this.alertService.errorAlert(`Erro ao ${this.edit ? 'salvo' : 'atualizado'} o departamento`, `Detalhes ${erro}`);
      })
    this.form.reset();
  }

  delete(departamento: Departamento) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.departamentoService.delete(departamento.id)
          .then(() =>
            this.alertService.alertSuccess('Deletado com sucesso!'));
      }
    })
  }
}
