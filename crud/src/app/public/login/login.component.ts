import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    try {
      if (this.email == undefined || this.senha == undefined) {
        this.mensagem = 'Usuário ou senha invalidos'
        return
      }
      this.authServ.login(this.email, this.senha)
        .then(() => {
          this.router.navigate(['/admin/painel'])
          Swal.fire('FOI', 'AGORA DEU CERTO');
        }).catch(erro => {
          let detalhes = '';
          Swal.fire('ERROU', 'DEU RUIM HEIN');
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não existe usuário para o email informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email invalido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha inválido';
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
          }
          this.mensagem = `Erro ao logar. ${detalhes}`;

        });
    } catch (erro) {
      this.mensagem = `Erro ao logar. Detalhes: ${erro}`;

    }

  }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email'
    })
    if (email) {
      this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instrução pra recuperação.`;
        })
        .catch(erro => {
          this.mensagem = `Erro ao localizar o email. Detalhes ${erro.message}`;
          console.log('DEU ERRO  -- ',erro.message);
        })
    }
  }

}
