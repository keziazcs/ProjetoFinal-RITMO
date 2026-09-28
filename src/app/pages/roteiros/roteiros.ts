import {
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { RitmoService }
  from '../../services/ritmo';

import { ContextoDoDiaService }
  from '../../services/contexto-do-dia';

import { ROTEIROS }
  from '../../data/roteiros';

import { Roteiro }
  from '../../models/roteiro';


@Component({
  selector: 'app-roteiros',
  imports: [],
  templateUrl: './roteiros.html',
  styleUrl: './roteiros.css'
})
export class Roteiros {

  private readonly ritmoService =
    inject(RitmoService);

  private readonly contextoService =
    inject(ContextoDoDiaService);

  private readonly router =
    inject(Router);


  protected roteirosCompativeis:
    Roteiro[] = [];


  constructor() {

    const contexto =
      this.contextoService
        .obterContexto();


    if (!contexto) {

      this.router.navigate([
        '/contexto-do-dia'
      ]);

      return;

    }


    this.roteirosCompativeis =
      this.ritmoService
        .buscarCompativeis(
          ROTEIROS,
          contexto
        );

  }


  protected abrirRoteiro(
    id: number | string
  ): void {

    this.router.navigate([
      '/roteiro',
      id
    ]);

  }


  protected ajustarContexto(): void {

    this.router.navigate([
      '/contexto-do-dia'
    ]);

  }


  protected voltarHome(): void {

    this.router.navigate([
      '/home'
    ]);

  }

}