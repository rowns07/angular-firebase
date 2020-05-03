import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao } from 'src/app/models/requisicao.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  requisicoes$: Observable<Requisicao[]>;
  departamento$: Observable<Departamento[]>;
  displayDialogRequisicao: boolean;
  edit: boolean;
  funcionarioLogado: Funcionario;
  form: FormGroup

  constructor(
    private departamentoService: DepartamentoService,
    private funcionarioService: FuncionarioService,
    private requisicaoService: RequisicaoService,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    // this.requisicoes$ = this.requisicaoService.list();
    this.departamento$ = this.departamentoService.list();
    this.configForm();
    this.recuperaFuncionario();
  }

  async recuperaFuncionario() {
    await this.auth.authUser()
      .subscribe(dados => {
        this.funcionarioService.getFuncionarioLogado(dados.email)
          .subscribe(funcionarios => {
            this.funcionarioLogado = funcionarios[0];
            this.requisicoes$ = this.requisicaoService.list()
              .pipe(
                map((reqs: Requisicao[]) => reqs.filter(r => r.solicitante.email === this.funcionarioLogado.email))
              )
          })

      })
  }

  // recuperaFuncionario() {
  //   debugger;
  //   return this.auth.authUser().subscribe(
  //     user => {
  //       if (user) {
  //         this.funcionarioLogado = user.providerData[0]
  //         console.log(this.funcionarioLogado)
  //       }
  //     }
  //   )
  // }

  configForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(),
      ultimaAtualizacao: new FormControl(),
      status: new FormControl(),
      descricao: new FormControl('', Validators.required)
    })
  }

  add() {
    this.form.reset();
    this.displayDialogRequisicao = true;
    this.edit = false;
    this.setValorPadrao();
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'Aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date()
    })
  }

  selecionaRequisicao(requisicao: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(requisicao);
  }

  saveForm(): void {
    this.requisicaoService.createOrUpdate(this.form.value)
      .then(() => {
        this.alertService.alertSuccess(`Requisição ${this.edit ? 'salvo' : 'atualizado'} com sucesso`, '', 'success');
        this.displayDialogRequisicao = false;
      })
      .catch((erro) => {
        this.alertService.errorAlert(`Erro ao ${this.edit ? 'salvo' : 'atualizado'} o requisição`, `Detalhes ${erro}`);
      });
    this.form.reset();
  }

  delete(requisicao: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão do chamado?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(requisicao.id)
          .then(() =>
            this.alertService.alertSuccess('Deletado com sucesso!'));
      }
    });
  }
}
