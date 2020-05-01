import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AlertService } from 'src/app/services/alert.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario-prime-ng',
  templateUrl: './funcionario-prime-ng.component.html',
  styleUrls: ['./funcionario-prime-ng.component.scss']
})
export class FuncionarioPrimeNgComponent implements OnInit {

  funcionario$: Observable<Funcionario[]>;
  departamento$: Observable<Departamento[]>;
  edit: boolean;
  form: FormGroup;
  displayDialog: boolean;
  selectedUser: Funcionario;
  cols: any[];


  constructor(private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.funcionario$ = this.funcionarioService.list();
    this.departamento$ = this.departamentoService.list();
    this.cols = [
      { field: 'nome', header: 'NOME' },
      { field: 'email', header: 'EMAIL' },
      { field: 'funcao', header: 'FUNCAO' },
      { field: 'departamento', header: 'DEPARTAMENTO' }
    ];

  }




  showDialogToAdd() {
    this.edit = true;
    this.selectedUser = new Funcionario();
    this.displayDialog = true;
  }

  save(funcionarioSelecionado: any) {
    this.funcionarioService.createOrUpdate(funcionarioSelecionado)
      .then(() => {
        this.alertService.alertSuccess(`Departamento ${this.edit ? 'salvo' : 'atualizado'} com sucesso`, '', 'success');
      })
      .catch((erro) => {
        this.alertService.errorAlert(`Erro ao ${this.edit ? 'salvo' : 'atualizado'} o departamento`, `Detalhes ${erro}`);
      });
    this.displayDialog = false;
  }

  delete() {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.delete(this.selectedUser.id)
          .then(() =>
            this.alertService.alertSuccess('Deletado com sucesso!'));
      }
    });
    this.displayDialog = false;
  }

  onRowSelect(funcionario: Funcionario) {
    this.edit = false;
    this.displayDialog = true;
    console.log('selectedUser - ', this.selectedUser)
  }

  onRowUnselect(funcionario: Funcionario) {
    this.selectedUser = undefined;
  }

}
