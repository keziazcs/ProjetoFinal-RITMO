import {
  Injectable,
  Renderer2,
  RendererFactory2,
  signal
} from '@angular/core';


export type ModoTema =
  'claro'
  | 'escuro'
  | 'sistema';


@Injectable({
  providedIn: 'root'
})
export class Tema {

  private readonly renderer:
    Renderer2;

  readonly modo =
    signal<ModoTema>('escuro');


  constructor(
    rendererFactory:
      RendererFactory2
  ) {

    this.renderer =
      rendererFactory
        .createRenderer(
          null,
          null
        );


    const salvo =
      localStorage.getItem(
        'ritmoTema'
      ) as ModoTema | null;


    if (
      salvo === 'claro' ||
      salvo === 'escuro' ||
      salvo === 'sistema'
    ) {

      this.modo.set(
        salvo
      );

    }


    this.aplicarTema();

  }


  definirModo(
    modo: ModoTema
  ): void {

    this.modo.set(
      modo
    );


    localStorage.setItem(
      'ritmoTema',
      modo
    );


    this.aplicarTema();

  }


  private aplicarTema(): void {

    const body =
      document.body;


    this.renderer.removeClass(
      body,
      'light-theme'
    );


    if (
      this.modo() === 'claro'
    ) {

      this.renderer.addClass(
        body,
        'light-theme'
      );

      return;

    }


    if (
      this.modo() === 'sistema'
    ) {

      const prefereClaro =
        window.matchMedia(
          '(prefers-color-scheme: light)'
        ).matches;


      if (prefereClaro) {

        this.renderer.addClass(
          body,
          'light-theme'
        );

      }

    }

  }

}