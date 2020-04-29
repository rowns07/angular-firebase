import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Departamento } from 'src/app/models/departamento.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  funcionario$: Observable<Funcionario[]>;
  departamento$: Observable<Departamento[]>;
  displayDialogFuncionario: Funcionario;
  departamentoFiltro: string;
  edit: boolean;
  form: FormGroup;
  // form2: FormGroup;

  funcionarioSelecionado: Funcionario;
  displayDialog: boolean;
  selectedCar: Funcionario;
  cols: any[];

  // car: any;
  // newCar: boolean;
  // cars: Funcionario[];

  constructor(private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.funcionario$ = this.funcionarioService.list();
    this.departamento$ = this.departamentoService.list();
    this.departamentoFiltro = 'TODOS';
    // this.funcionarioSelecionado = new Funcionario()
    this.configForm();


    this.cols = [
      { field: 'nome', header: 'NOME' },
      { field: 'email', header: 'EMAIL' },
      { field: 'funcao', header: 'FUNCAO' },
      { field: 'departamento', header: 'DEPARTAMENTO' }
    ];

  }




  showDialogToAdd() {
    this.edit = true;
    // this.car = {};
    this.displayDialog = true;
  }

  save(funcionarioSelecionado: any) {
    this.funcionarioService.createOrUpdate(funcionarioSelecionado)
      .then(() => {
        this.alertService.alertSuccess(`Departamento ${this.edit ? 'salvo' : 'atualizado'} com sucesso`, '', 'success');
        this.displayDialogFuncionario = undefined;
      })
      .catch((erro) => {
        this.displayDialogFuncionario = undefined;
        this.alertService.errorAlert(`Erro ao ${this.edit ? 'salvo' : 'atualizado'} o departamento`, `Detalhes ${erro}`);
      });
    this.form.reset();
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
        this.funcionarioService.delete(this.selectedCar.id)
          .then(() =>
            this.alertService.alertSuccess('Deletado com sucesso!'));
      }
    });
    this.displayDialog = false;
  }

  onRowSelect(funcionario: Funcionario) {
    this.edit = false;
    // this.car = this.cloneCar(event.data);
    this.displayDialog = true;
    this.funcionarioSelecionado = funcionario;
    console.log('FuncionarioSelecionado - ', this.funcionarioSelecionado);
    console.log('SelectedCAR - ', this.selectedCar)

  }

  // cloneCar(c: Funcionario) {
  //   let car = {};
  //   for (let prop in c) {
  //     car[prop] = c[prop];
  //   }
  //   return car;
  // }















  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = new Funcionario();
  }

  configForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(''),
      nome: new FormControl(Validators.required),
      email: new FormControl([Validators.required, Validators.email]),
      funcao: new FormControl(''),
      departamento: new FormControl(Validators.required)
    });
  }

  selecionarFuncionario(funcionario: Funcionario) {
    this.edit = true;
    this.displayDialogFuncionario = new Funcionario();
    this.form.setValue(funcionario);
  }

  saveForm(): void {
    this.funcionarioService.createOrUpdate(this.form.value)
      .then(() => {
        this.alertService.alertSuccess(`Departamento ${this.edit ? 'salvo' : 'atualizado'} com sucesso`, '', 'success');
        this.displayDialogFuncionario = undefined;
      })
      .catch((erro) => {
        this.displayDialogFuncionario = undefined;
        this.alertService.errorAlert(`Erro ao ${this.edit ? 'salvo' : 'atualizado'} o departamento`, `Detalhes ${erro}`);
      });
    this.form.reset();
  }

  deletarFuncionario(funcionario: Funcionario) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.departamentoService.delete(funcionario.id)
          .then(() =>
            this.alertService.alertSuccess('Deletado com sucesso!'));
      }
    });
  }


}
