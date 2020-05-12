import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Departamento } from 'src/app/models/departamento.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  edit: boolean;
  departamentos$: Observable<Departamento[]>;
  funcionario$: Observable<Funcionario[]>;
  funcionario: Funcionario;
  form: FormGroup;
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;

  constructor(private router: Router, private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService, private formBuilder: FormBuilder, private alertService: AlertService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.funcionario$ = this.funcionarioService.list();
    this.departamentos$ = this.departamentoService.list();
    this.configForm();

  }

  add() {
    this.funcionario = new Funcionario();
    this.edit = false;
    this.form.reset();


  }
  configForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      funcao: new FormControl(''),
      departamento: new FormControl('', Validators.required),
      foto: new FormControl()
    });
  }

  selecionarFuncionario(funcionarioSelecionado: Funcionario) {
    this.funcionario = funcionarioSelecionado;
    this.edit = true;
    this.form.setValue(funcionarioSelecionado);
  }

  delete(funcionario: Funcionario) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.delete(funcionario.id)
          .then(() =>
            this.alertService.alertSuccess('Deletado com sucesso!'));
      }
    });
  }

  saveForm(): void {
    this.funcionarioService.createOrUpdate(this.form.value)
      .then(() => {
        this.alertService.alertSuccess(`Departamento ${this.edit ? 'salvo' : 'atualizado'} com sucesso`, '', 'success');
        this.funcionario = undefined;
      })
      .catch((erro) => {
        this.funcionario = undefined;
        this.alertService.errorAlert(`Erro ao ${this.edit ? 'salvo' : 'atualizado'} o departamento`, `Detalhes ${erro}`);
      });
    this.form.reset();
  }

  async upload(event) {
    this.complete = false;
    const file = event.target.files[0];
    const path = `funcionarios/${new Date().getTime().toString()}`;
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.task.then(up => {
      fileRef.getDownloadURL().subscribe(url => {
        this.complete = true;
        this.form.patchValue({
          foto: url
        })
      });
    });
    this.uploadPercent = this.task.percentageChanges();
    this.inputFile.nativeElement.value = '';
  }

}
