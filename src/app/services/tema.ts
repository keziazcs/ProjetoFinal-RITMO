import {
  Injectable,
  signal
} from '@angular/core';

export type ModoTema =
  | 'claro'
  | 'escuro'
  | 'sistema';


@Injectable({
  providedIn: 'root'
})
export class Tema {

  private readonly chaveStorage =
    'ritmoTema';

  private readonly modoSignal =
    signal<ModoTema>(
      this.carregarPreferencia()
    );

  readonly modo =
    this.modoSignal.asReadonly();


  private readonly sistemaEscuro =
    window.matchMedia(
      '(prefers-color-scheme: dark)'
    );


  constructor() {

    this.aplicarTema(
      this.modoSignal()
    );


    this.sistemaEscuro.addEventListener(
      'change',
      () => {

        if (
          this.modoSignal() ===
          'sistema'
        ) {

          this.aplicarTema(
            'sistema'
          );

        }

      }
    );

  }


  definirModo(
    modo: ModoTema
  ): void {

    this.modoSignal.set(
      modo
    );


    localStorage.setItem(
      this.chaveStorage,
      modo
    );


    this.aplicarTema(
      modo
    );

  }


  private carregarPreferencia():
    ModoTema {

    const salvo =
      localStorage.getItem(
        this.chaveStorage
      );


    if (
      salvo === 'claro' ||
      salvo === 'escuro' ||
      salvo === 'sistema'
    ) {

      return salvo;

    }


    return 'sistema';

  }


  private aplicarTema(
    modo: ModoTema
  ): void {

    let temaFinal:
      'claro' | 'escuro';


    if (modo === 'sistema') {

      temaFinal =
        this.sistemaEscuro.matches
          ? 'escuro'
          : 'claro';

    } else {

      temaFinal = modo;

    }


    document.documentElement
      .setAttribute(
        'data-theme',
        temaFinal
      );

  }

}