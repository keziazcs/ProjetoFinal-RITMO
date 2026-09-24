import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

import { ContextoDoDiaService } from '../../services/contexto-do-dia';
import { ContextoUsuario } from '../../models/contexto-usuario';

@Component({
  selector: 'app-contexto-do-dia',
  imports: [ReactiveFormsModule],
  templateUrl: './contexto-do-dia.html',
  styleUrl: './contexto-do-dia.css'
})
export class ContextoDoDia {

  private readonly contextoService = inject(ContextoDoDiaService);
  private readonly router = inject(Router);

  protected readonly passoAtual = signal(1);

  protected readonly formulario = new FormGroup({

    energia: new FormControl<
      'baixa' | 'media' | 'alta'
    >('media', {
      nonNullable: true
    }),

    tempoDisponivel: new FormControl<number>(
      4,
      {
        nonNullable: true
      }
    ),

    orcamento: new FormControl<number>(
      100,
      {
        nonNullable: true
      }
    ),

    companhia: new FormControl<
      'sozinho' | 'casal' | 'amigos' | 'familia'
    >('sozinho', {
      nonNullable: true
    }),

    preferePoucaCaminhada: new FormControl<boolean>(
      false,
      {
        nonNullable: true
      }
    )

  });


  protected selecionarEnergia(
    energia: 'baixa' | 'media' | 'alta'
  ): void {

    this.formulario.controls.energia.setValue(energia);

    this.proximoPasso();
  }


  protected selecionarTempo(
    tempo: number
  ): void {

    this.formulario.controls.tempoDisponivel.setValue(
      tempo
    );

    this.proximoPasso();
  }


  protected selecionarOrcamento(
    valor: number
  ): void {

    this.formulario.controls.orcamento.setValue(
      valor
    );

    this.proximoPasso();
  }


  protected selecionarCompanhia(
  companhia:
    | 'sozinho'
    | 'casal'
    | 'amigos'
    | 'familia'
): void {

  this.formulario.controls.companhia.setValue(
    companhia
  );

  this.finalizar();
}


  protected proximoPasso(): void {

    if (this.passoAtual() < 4) {
      this.passoAtual.update(
        passo => passo + 1
      );
    }
  }


  protected voltar(): void {

    if (this.passoAtual() > 1) {

      this.passoAtual.update(
        passo => passo - 1
      );

      return;
    }

    this.router.navigate(['/home']);
  }


  protected finalizar(): void {

  const valores =
    this.formulario.getRawValue();

  const contexto: ContextoUsuario = {
    tempoDisponivel: valores.tempoDisponivel,
    energia: valores.energia,
    orcamento: valores.orcamento,
    companhia: valores.companhia,
    interesses: [],
    preferePoucaCaminhada: false
  };

  this.contextoService.salvarContexto(
    contexto
  );

  this.router.navigate([
    '/roteiros'
  ]);
}

}