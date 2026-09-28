import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy {

  slideAtual = 0;

  modo: 'login' | 'cadastro' = 'login';

  // LOGIN
  email = '';
  senha = '';

  // CADASTRO
  nomeCadastro = '';
  emailCadastro = '';
  senhaCadastro = '';
  aceitouTermos = false;

  // NOTIFICAÇÃO
  mensagem = '';
  tipoMensagem:
    | 'erro'
    | 'sucesso'
    | '' = '';

  private intervaloCarrossel?:
    ReturnType<typeof setInterval>;

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    this.intervaloCarrossel =
      setInterval(() => {

        this.slideAtual =
          (this.slideAtual + 1) % 3;

      }, 5500);
  }


  selecionarSlide(
    index: number
  ): void {

    this.slideAtual = index;
  }


  alterarModo(
    modo: 'login' | 'cadastro'
  ): void {

    this.modo = modo;

    this.limparMensagem();
  }


  cadastrar(): void {

    this.limparMensagem();

    if (
      !this.nomeCadastro.trim() ||
      !this.emailCadastro.trim() ||
      !this.senhaCadastro.trim()
    ) {

      this.mostrarErro(
        'Preencha todos os campos.'
      );

      return;
    }


    if (
      !this.emailValido(
        this.emailCadastro
      )
    ) {

      this.mostrarErro(
        'Digite um e-mail válido.'
      );

      return;
    }


    if (
      this.senhaCadastro.length < 6
    ) {

      this.mostrarErro(
        'A senha precisa ter pelo menos 6 caracteres.'
      );

      return;
    }


    if (!this.aceitouTermos) {

      this.mostrarErro(
        'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
      );

      return;
    }


    const usuario = {

      nome:
        this.nomeCadastro.trim(),

      email:
        this.emailCadastro
          .trim()
          .toLowerCase(),

      senha:
        this.senhaCadastro
    };


    localStorage.setItem(
      'ritmoUsuario',
      JSON.stringify(usuario)
    );


    this.email = usuario.email;

    this.senha = '';

    this.nomeCadastro = '';
    this.emailCadastro = '';
    this.senhaCadastro = '';
    this.aceitouTermos = false;


    this.modo = 'login';


    this.mostrarSucesso(
      'Cadastro concluído! Agora é só entrar.'
    );

  }


  entrar(): void {

    this.limparMensagem();

    if (
      !this.email.trim() ||
      !this.senha.trim()
    ) {

      this.mostrarErro(
        'Informe seu e-mail e sua senha.'
      );

      return;
    }


    const usuarioSalvo =
      localStorage.getItem(
        'ritmoUsuario'
      );


    if (!usuarioSalvo) {

      this.mostrarErro(
        'Nenhuma conta encontrada. Crie uma conta primeiro.'
      );

      return;
    }


    const usuario =
      JSON.parse(usuarioSalvo);


    const emailCorreto =
      usuario.email ===
      this.email
        .trim()
        .toLowerCase();


    const senhaCorreta =
      usuario.senha ===
      this.senha;


    if (
      !emailCorreto ||
      !senhaCorreta
    ) {

      this.mostrarErro(
        'E-mail ou senha incorretos.'
      );

      return;
    }


    localStorage.setItem(
      'ritmoLogado',
      'true'
    );


    this.mostrarSucesso(
      'Login realizado com sucesso!'
    );


    setTimeout(() => {

      this.router.navigate([
        '/home'
      ]);

    }, 700);

  }


  private emailValido(
    email: string
  ): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }


  private mostrarErro(
    mensagem: string
  ): void {

    this.tipoMensagem = 'erro';

    this.mensagem = mensagem;
  }


  private mostrarSucesso(
    mensagem: string
  ): void {

    this.tipoMensagem = 'sucesso';

    this.mensagem = mensagem;
  }


  private limparMensagem(): void {

    this.tipoMensagem = '';

    this.mensagem = '';
  }


  ngOnDestroy(): void {

    if (this.intervaloCarrossel) {

      clearInterval(
        this.intervaloCarrossel
      );

    }

  }

}