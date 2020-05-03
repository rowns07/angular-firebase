import { Component, OnInit, Input } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Movimentacao } from 'src/app/models/movimentacao.model';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss']
})
export class MovimentacaoComponent implements OnInit {

  @Input() funcionarioLogado: Funcionario;
  requisicoe$: Observable<Requisicao[]>;
  movimentacoes: Movimentacao[];
  requisicaoSelecionada: Requisicao;
  edit: boolean;
  displayDialogMovimentacao: boolean;
  displayDialogMovimentacoes: boolean;
  form: FormGroup;
  listaStatus: string[];

  constructor(
    private requisicaoService: RequisicaoService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.configForm();
    this.carregaStatus();
    this.listRequisicoesDepartamentos();
  }

  configForm() {
    this.form = this.formBuilder.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    })
  }

  carregaStatus() {
    this.listaStatus = ['Aberto', 'Pendente', 'Processando', 'Não Autorizado', 'finalizado'];
  }

  listRequisicoesDepartamentos() {
    this.requisicaoService.list()
      .pipe(
        map((reqs: Requisicao[]) =>
          reqs.filter(r =>
            r.destino.nome === this.funcionarioLogado.departamento.nome
          )
        )
      )
  }

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit = false;
    this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = (!requisicao.movimentacoes ? [] : requisicao.movimentacoes);
    this.displayDialogMovimentacoes = true;
  }

  setValorPadrao() {
    this.form.patchValue({
      funcionario: this.funcionarioLogado,
      dataHora: new Date()
    })
    this.movimentacoes = [];
  }


  save() {
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService.createOrUpdate(this.requisicaoSelecionada).then(() => {
      this.displayDialogMovimentacao = false;
      Swal.fire(`Requisição ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '', 'success');
    })
      .catch((erro) => {
        this.displayDialogMovimentacao = true;
        Swal.fire(`Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o Requisição.`, `Detalhes: ${erro}`, 'error');
      })
    this.form.reset()
  }

  delete(requisicao: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão da Requisicão?',
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

  onDialogClose(event) {
    this.displayDialogMovimentacoes = event;
  }

  verMovimentacoes(requisicao: Requisicao) {
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }

}
