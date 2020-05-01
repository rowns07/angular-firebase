import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { AuthguardService } from './services/authguard.service';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/painel',
    loadChildren: () => import('./components/admin/painel/painel.module').then(m => m.PainelModule),
    canActivate: [AuthguardService]
  }, {
    path: 'admin/departamento',
    loadChildren: () => import('./components/admin/departamento/departamento.module').then(m => m.DepartamentoModule),
    canActivate: [AuthguardService]
  }, {
    path: 'admin/funcionario',
    loadChildren: () => import('./components/admin/funcionario/funcionario.module').then(m => m.FuncionarioModule),
    canActivate: [AuthguardService]
  }, {
    path: 'admin/funcionario-prime',
    loadChildren: () => import('./components/admin/funcionario-prime-ng/funcionario-prime-ng.module').then(m => m.FuncionarioPrimeNgModule),
    canActivate: [AuthguardService]
  }
  , {
    path: 'admin/requisicao',
    loadChildren: () => import('./components/admin/requisicao/requisicao.module').then(m => m.RequisicaoModule),
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
