import {
  Component,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BottomNav }
  from '../../components/bottom-nav/bottom-nav';


interface GrupoRitmo {
  id: string;
  nome: string;
  codigo: string;
  membros: number;
}


@Component({
  selector: 'app-grupos',

  imports: [
    FormsModule,
    BottomNav
  ],

  templateUrl: './grupos.html',
  styleUrl: './grupos.css'
})
export class Grupos {

  private readonly router =
    inject(Router);


  protected grupos:
    GrupoRitmo[] = [];


  protected criandoGrupo =
    false;


  protected nomeNovoGrupo =
    '';


  constructor() {

    this.carregarGrupos();

  }


  protected abrirCriacao(): void {

    this.criandoGrupo = true;

  }


  protected fecharCriacao(): void {

    this.criandoGrupo = false;

    this.nomeNovoGrupo = '';

  }


  protected criarGrupo(): void {

    const nome =
      this.nomeNovoGrupo.trim();


    if (!nome) {
      return;
    }


    const novoGrupo:
      GrupoRitmo = {

      id:
        Date.now().toString(),

      nome,

      codigo:
        this.gerarCodigo(),

      membros: 1

    };


    this.grupos = [
      novoGrupo,
      ...this.grupos
    ];


    this.salvarGrupos();

    this.fecharCriacao();

  }


  protected excluirGrupo(
    id: string
  ): void {

    this.grupos =
      this.grupos.filter(
        grupo =>
          grupo.id !== id
      );


    this.salvarGrupos();

  }


  protected voltarHome(): void {

    this.router.navigate([
      '/home'
    ]);

  }


  private gerarCodigo(): string {

    return Math
      .random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  }


  private carregarGrupos(): void {

    const salvo =
      localStorage.getItem(
        'ritmoGrupos'
      );


    if (!salvo) {
      return;
    }


    try {

      const grupos =
        JSON.parse(
          salvo
        );


      if (
        Array.isArray(grupos)
      ) {

        this.grupos =
          grupos;

      }

    } catch {

      this.grupos = [];

    }

  }


  private salvarGrupos(): void {

    localStorage.setItem(
      'ritmoGrupos',
      JSON.stringify(
        this.grupos
      )
    );

  }

}