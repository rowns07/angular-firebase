import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  requisicao$: Observable<Requisicao[]>;
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
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.requisicao$ = this.requisicaoService.list();
    this.departamento$ = this.departamentoService.list();
  }

}
