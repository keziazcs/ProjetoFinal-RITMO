import {
  Component,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Location } from '@angular/common';

import { ROTEIROS }
  from '../../data/roteiros';

import { Roteiro as RoteiroModel }
  from '../../models/roteiro';


@Component({
  selector: 'app-roteiro',
  imports: [],
  templateUrl: './roteiro.html',
  styleUrl: './roteiro.css'
})
export class Roteiro {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly location =
    inject(Location);


  protected roteiro:
    RoteiroModel | undefined;


  protected favorito = false;

  protected mensagem = '';


  constructor() {

    const id =
      this.route.snapshot
        .paramMap
        .get('id');


    this.roteiro =
      ROTEIROS.find(
        roteiro =>
          String(roteiro.id) ===
          String(id)
      );


    if (!this.roteiro) {

      this.router.navigate([
        '/roteiros'
      ]);

      return;

    }


    this.carregarFavorito();

  }


  protected voltar(): void {

    this.location.back();

  }


  protected imagemRoteiro(): string {

    if (!this.roteiro) {

      return '/images/centrohistorico.png';

    }


    const nome =
      this.roteiro.nome
        .toLowerCase();


    if (
      nome.includes(
        'rio vermelho'
      )
    ) {

      return '/images/riovermelho.png';

    }


    if (
      nome.includes(
        'barra'
      )
    ) {

      return '/images/barra.png';

    }


    return '/images/centrohistorico.png';

  }


  protected alternarFavorito(): void {

    if (!this.roteiro) {
      return;
    }


    const id =
      String(
        this.roteiro.id
      );


    const favoritos =
      this.obterIdsFavoritos();


    const existe =
      favoritos.includes(id);


    const novosFavoritos =
      existe

        ? favoritos.filter(
            favoritoId =>
              favoritoId !== id
          )

        : [
            ...favoritos,
            id
          ];


    localStorage.setItem(
      'ritmoFavoritos',
      JSON.stringify(
        novosFavoritos
      )
    );


    this.favorito =
      !existe;


    this.mensagem =
      this.favorito
        ? 'Roteiro salvo nos favoritos.'
        : 'Roteiro removido dos favoritos.';


    setTimeout(() => {

      this.mensagem = '';

    }, 2200);

  }


  protected iniciarRitmo(): void {

    if (!this.roteiro) {
      return;
    }


    localStorage.setItem(
      'ritmoAtivo',
      JSON.stringify(
        this.roteiro
      )
    );


    this.mensagem =
      'Ritmo escolhido! Seu roteiro está pronto.';


    setTimeout(() => {

      this.mensagem = '';

    }, 2200);

  }


  protected ajustarRitmo(): void {

    this.router.navigate([
      '/contexto-do-dia'
    ]);

  }


  private carregarFavorito(): void {

    if (!this.roteiro) {
      return;
    }


    this.favorito =
      this.obterIdsFavoritos()
        .includes(
          String(
            this.roteiro.id
          )
        );

  }


  private obterIdsFavoritos():
    string[] {

    const salvo =
      localStorage.getItem(
        'ritmoFavoritos'
      );


    if (!salvo) {

      return [];

    }


    try {

      const ids =
        JSON.parse(
          salvo
        );


      if (!Array.isArray(ids)) {

        return [];

      }


      return ids.map(
        id =>
          String(id)
      );

    } catch {

      return [];

    }

  }

}