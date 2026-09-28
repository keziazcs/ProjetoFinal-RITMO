import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { BottomNav }
  from '../../components/bottom-nav/bottom-nav';

import { SideMenu }
  from '../../components/side-menu/side-menu';

import { ROTEIROS }
  from '../../data/roteiros';


@Component({
  selector: 'app-home',

  imports: [
    BottomNav,
    SideMenu
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private readonly router =
    inject(Router);


  protected menuAberto = false;


  protected nomeUsuario =
    'Viajante';


  protected inicialUsuario =
    'V';


  protected cidadeAtual =
    'Salvador';


  protected readonly destaques =
    ROTEIROS.slice(0, 3);


  protected favoritos =
    new Set<string>();


  ngOnInit(): void {

    this.carregarUsuario();

    this.carregarFavoritos();

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

    } catch {

      this.nomeUsuario =
        'Viajante';

      this.inicialUsuario =
        'V';

    }

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


  protected abrirMenu(): void {

    this.menuAberto = true;

  }


  protected fecharMenu(): void {

    this.menuAberto = false;

  }


  protected navegar(
    rota: string
  ): void {

    this.router.navigate([
      rota
    ]);

  }


  protected irParaRitmo(): void {

    this.router.navigate([
      '/local'
    ]);

  }


  protected abrirFeed(): void {

    this.router.navigate([
      '/feed'
    ]);

  }


  protected abrirRoteiro(
    id: number | string
  ): void {

    this.router.navigate([
      '/roteiro',
      id
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
        rgba(8, 20, 13, 0.04) 0%,
        rgba(8, 20, 13, 0.15) 50%,
        rgba(8, 20, 13, 0.78) 100%
      ),
      url('${this.imagemRoteiro(nome)}')
    `;

  }

}