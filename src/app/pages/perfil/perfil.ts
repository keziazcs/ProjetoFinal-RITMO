import {
  Component,
  inject
} from '@angular/core';

import { Router }
  from '@angular/router';

import { BottomNav }
  from '../../components/bottom-nav/bottom-nav';

import {
  ModoTema,
  Tema
} from '../../services/tema';


@Component({
  selector: 'app-perfil',

  imports: [
    BottomNav
  ],

  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

  private readonly router =
    inject(Router);

  protected readonly tema =
    inject(Tema);


  protected nomeUsuario =
    'Viajante';

  protected emailUsuario =
    '';

  protected inicialUsuario =
    'V';

  protected cidade =
    'Salvador';


  constructor() {

    this.carregarUsuario();

  }


  private carregarUsuario(): void {

    const usuarioSalvo =
      localStorage.getItem(
        'ritmoUsuario'
      );


    if (!usuarioSalvo) {
      return;
    }


    try {

      const usuario =
        JSON.parse(
          usuarioSalvo
        );


      if (
        typeof usuario.nome ===
        'string' &&
        usuario.nome.trim()
      ) {

        this.nomeUsuario =
          usuario.nome.trim();

        this.inicialUsuario =
          this.nomeUsuario
            .charAt(0)
            .toUpperCase();

      }


      if (
        typeof usuario.email ===
        'string'
      ) {

        this.emailUsuario =
          usuario.email;

      }

    } catch {

      this.nomeUsuario =
        'Viajante';

      this.inicialUsuario =
        'V';

    }

  }


  protected alterarTema(
    modo: ModoTema
  ): void {

    this.tema.definirModo(
      modo
    );

  }


  protected temaAtivo(
    modo: ModoTema
  ): boolean {

    return (
      this.tema.modo() ===
      modo
    );

  }


  protected abrirFavoritos(): void {

    this.router.navigate([
      '/favoritos'
    ]);

  }


  protected encontrarRitmo(): void {

    this.router.navigate([
      '/local'
    ]);

  }


  protected sair(): void {

    localStorage.removeItem(
      'ritmoLogado'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}