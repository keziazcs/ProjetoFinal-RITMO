import {
  Component,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  ContextoDoDiaService
} from '../../services/contexto-do-dia';

import {
  ContextoUsuario
} from '../../models/contexto-usuario';


type Energia =
  'baixa'
  | 'media'
  | 'alta';

type Companhia =
  'sozinho'
  | 'casal'
  | 'amigos'
  | 'familia';


@Component({
  selector: 'app-contexto-do-dia',
  imports: [],
  templateUrl: './contexto-do-dia.html',
  styleUrl: './contexto-do-dia.css'
})
export class ContextoDoDia {

  private readonly router =
    inject(Router);

  private readonly contextoService =
    inject(ContextoDoDiaService);


  protected readonly passoAtual =
    signal(1);


  protected energia:
    Energia | null = null;

  protected tempoDisponivel:
    number | null = null;

  protected orcamento:
    number | null = null;

  protected companhia:
    Companhia | null = null;


  protected selecionarEnergia(
    energia: Energia
  ): void {

    this.energia =
      energia;

    this.proximoPasso();

  }


  protected selecionarTempo(
    tempo: number
  ): void {

    this.tempoDisponivel =
      tempo;

    this.proximoPasso();

  }


  protected selecionarOrcamento(
    orcamento: number
  ): void {

    this.orcamento =
      orcamento;

    this.proximoPasso();

  }


  protected selecionarCompanhia(
    companhia: Companhia
  ): void {

    this.companhia =
      companhia;

    this.finalizar();

  }


  protected passoAnterior(): void {

    if (
      this.passoAtual() > 1
    ) {

      this.passoAtual.update(
        passo =>
          passo - 1
      );

      return;

    }


    this.router.navigate([
      '/local'
    ]);

  }


  protected voltar(): void {

    this.passoAnterior();

  }


  private proximoPasso(): void {

    if (
      this.passoAtual() < 4
    ) {

      this.passoAtual.update(
        passo =>
          passo + 1
      );

    }

  }


  private finalizar(): void {

    if (
      !this.energia ||
      this.tempoDisponivel === null ||
      this.orcamento === null ||
      !this.companhia
    ) {

      return;

    }


    const contexto:
      ContextoUsuario = {

      tempoDisponivel:
        this.tempoDisponivel,

      energia:
        this.energia,

      orcamento:
        this.orcamento,

      companhia:
        this.companhia,

      interesses: [],

      preferePoucaCaminhada:
        false

    };


    this.contextoService
      .salvarContexto(
        contexto
      );


    this.router.navigate([
      '/roteiros'
    ]);

  }

}