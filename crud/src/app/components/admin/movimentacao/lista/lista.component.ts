import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Movimentacao } from 'src/app/models/movimentacao.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @Input() movimentacoes: Movimentacao[];
  @Input() requisicaoSelecionada: Requisicao;
  @Input() displayDialogMovimentacoes: boolean;
  @Input() funcionarioLogado: Funcionario;
  @Output() displayChange = new EventEmitter();

  listaStatus: string[];
  displayDialogMovimentacao: boolean;
  form: FormGroup;
  edit: boolean;
  indexMovimentacoes: number;

  constructor(private requisicaoService: RequisicaoService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.configForm();
    this.carregaStatus();
  }

  configForm() {
    this.form = this.formBuilder.group({

      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    })
  }

  carregaStatus() {
    this.listaStatus = ['Aberto', 'Pendente', 'Processando', 'Não autorizada', 'Finalizado']
  }

  // RECEBE MOVIMENTACAO E INDEX ATRAVAS DOS PARAMETROS PARA PODER SETAR O FORMULARIO
  selecionaMovimento(mov: Movimentacao, index: number) {
    this.displayDialogMovimentacao = true;
    this.edit = true;
    this.form.setValue(mov);
    this.indexMovimentacoes = index;
  }

  onClose() {
    this.displayChange.emit(false);
  }

  update() {
    this.movimentacoes[this.indexMovimentacoes] = this.form.value;
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService.createOrUpdate(this.requisicaoSelecionada).then(() => {
      this.displayDialogMovimentacao = false;
      this.alertService.alertSuccess(`Movimentação ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '')
    })
      .catch((erro) => {
        this.displayDialogMovimentacao = false;
        this.alertService.errorAlert(`Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o Movimentação.`, `Detalhes: ${erro}`)
      })
    this.form.reset;
  }

  remove(array, element) {
    return array.filter(el => el !== element);
  }

  delete(mov: Movimentacao) {
    const movs = this.remove(this.movimentacoes, mov);
    Swal.fire({
      title: 'Confirma a exclusão da Movimentação?',
      text: '',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.requisicaoSelecionada.movimentacoes = movs;
        this.requisicaoService.createOrUpdate(this.requisicaoSelecionada)
          .then(() => {
            this.alertService.alertSuccess('Movimentação excluída com sucesso!', '', 'success')
            this.movimentacoes = movs;
          })
      }
    })
  }
}
