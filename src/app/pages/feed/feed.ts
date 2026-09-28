import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { BottomNav }
  from '../../components/bottom-nav/bottom-nav';

import { ROTEIROS }
  from '../../data/roteiros';

import {
  LugarEncontrado,
  PlacesService
} from '../../services/places.service';

import {
  LocalSelecionadoService
} from '../../services/local-selecionado.service';


@Component({
  selector: 'app-feed',

  imports: [
    BottomNav
  ],

  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {

  private readonly router =
    inject(Router);

  private readonly placesService =
    inject(PlacesService);

  private readonly localSelecionadoService =
    inject(LocalSelecionadoService);


  protected readonly roteiros =
    ROTEIROS;


  protected favoritos =
    new Set<string>();


  protected lugaresReais:
    LugarEncontrado[] = [];


  protected cidadeAtual = '';

  protected carregandoLugares = false;

  protected erroLugares = '';


  ngOnInit(): void {

    this.carregarFavoritos();

    this.carregarLugaresReais();

  }


  private carregarLugaresReais(): void {

    const local =
      this.localSelecionadoService
        .obter();


    if (!local) {

      this.erroLugares =
        'Escolha uma cidade para descobrir lugares próximos.';

      return;

    }


    this.cidadeAtual =
      local.nomeExibicao;


    this.carregandoLugares =
      true;


    this.placesService
      .buscarLugares(
        local.coordenadas.lat,
        local.coordenadas.lon
      )
      .subscribe({

        next: lugares => {

          this.lugaresReais =
            lugares;

          this.carregandoLugares =
            false;


          if (
            lugares.length === 0
          ) {

            this.erroLugares =
              'Nenhum lugar próximo encontrado.';

          }

        },


        error: erro => {

          console.error(
            'Erro Geoapify:',
            erro
          );

          this.erroLugares =
            'Não foi possível carregar lugares próximos.';

          this.carregandoLugares =
            false;

        }

      });

  }


  protected abrirRoteiro(
    id: number | string
  ): void {

    this.router.navigate([
      '/roteiro',
      id
    ]);

  }


  protected escolherCidade(): void {

    this.router.navigate([
      '/local'
    ]);

  }


  protected favoritar(
    id: number | string,
    event: Event
  ): void {

    event.stopPropagation();


    const idNormalizado =
      String(id);


    if (
      this.favoritos.has(
        idNormalizado
      )
    ) {

      this.favoritos.delete(
        idNormalizado
      );

    } else {

      this.favoritos.add(
        idNormalizado
      );

    }


    localStorage.setItem(
      'ritmoFavoritos',
      JSON.stringify(
        Array.from(
          this.favoritos
        )
      )
    );

  }


  protected estaFavoritado(
    id: number | string
  ): boolean {

    return this.favoritos.has(
      String(id)
    );

  }


  private carregarFavoritos(): void {

    const salvo =
      localStorage.getItem(
        'ritmoFavoritos'
      );


    if (!salvo) {
      return;
    }


    try {

      const ids =
        JSON.parse(
          salvo
        );


      if (Array.isArray(ids)) {

        this.favoritos =
          new Set<string>(
            ids.map(
              id =>
                String(id)
            )
          );

      }

    } catch {

      this.favoritos =
        new Set<string>();

    }

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


  protected backgroundRoteiro(
    nome: string
  ): string {

    return `
      linear-gradient(
        180deg,
        rgba(8,20,13,0.04) 0%,
        rgba(8,20,13,0.15) 50%,
        rgba(8,20,13,0.78) 100%
      ),
      url('${this.imagemRoteiro(nome)}')
    `;

  }


  protected formatarCategoria(
    categoria: string
  ): string {

    return categoria
      .split('.')
      .pop()
      ?.replaceAll(
        '_',
        ' '
      )
      ?? 'local';

  }

}