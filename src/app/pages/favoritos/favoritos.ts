import {
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { BottomNav }
  from '../../components/bottom-nav/bottom-nav';

import { ROTEIROS }
  from '../../data/roteiros';


@Component({
  selector: 'app-favoritos',

  imports: [
    BottomNav
  ],

  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {

  private readonly router =
    inject(Router);


  protected favoritos =
    this.carregarRoteirosFavoritos();


  protected abrirRoteiro(
    id: number | string
  ): void {

    this.router.navigate([
      '/roteiro',
      id
    ]);

  }


  protected removerFavorito(
    id: number | string,
    event: Event
  ): void {

    event.stopPropagation();


    const idNormalizado =
      String(id);


    const novosIds =
      this.idsFavoritos()
        .filter(
          favoritoId =>
            favoritoId !== idNormalizado
        );


    localStorage.setItem(
      'ritmoFavoritos',
      JSON.stringify(
        novosIds
      )
    );


    this.favoritos =
      this.carregarRoteirosFavoritos();

  }


  protected explorar(): void {

    this.router.navigate([
      '/feed'
    ]);

  }


  protected voltarHome(): void {

    this.router.navigate([
      '/home'
    ]);

  }


  protected imagemRoteiro(
    nome: string
  ): string {

    const nomeNormalizado =
      nome.toLowerCase();


    if (
      nomeNormalizado.includes(
        'rio vermelho'
      )
    ) {

      return '/images/riovermelho.png';

    }


    if (
      nomeNormalizado.includes(
        'barra'
      )
    ) {

      return '/images/barra.png';

    }


    return '/images/centrohistorico.png';

  }


  private carregarRoteirosFavoritos() {

    const ids =
      this.idsFavoritos();


    return ROTEIROS.filter(
      roteiro =>
        ids.includes(
          String(
            roteiro.id
          )
        )
    );

  }


  private idsFavoritos():
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


      if (
        !Array.isArray(ids)
      ) {

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