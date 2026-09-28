import {
  Component,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  LocalService
} from '../../services/local.service';

import {
  LocalSelecionadoService
} from '../../services/local-selecionado.service';


@Component({
  selector: 'app-local',

  imports: [
    FormsModule
  ],

  templateUrl: './local.html',
  styleUrl: './local.css'
})
export class Local {

  private readonly router =
    inject(Router);

  private readonly localService =
    inject(LocalService);

  private readonly localSelecionadoService =
    inject(LocalSelecionadoService);


  protected local = '';

  protected readonly carregando =
    signal(false);

  protected readonly erro =
    signal('');


  protected async continuar():
    Promise<void> {

    const texto =
      this.local.trim();


    if (!texto) {

      this.erro.set(
        'Digite uma cidade ou destino para continuar.'
      );

      return;
    }


    this.erro.set('');

    this.carregando.set(true);


    try {

      const resultado =
        await this.localService
          .buscarLocal(texto);


      if (!resultado) {

        this.erro.set(
          'Não encontramos esse local. Tente escrever de outra forma.'
        );

        return;
      }


      this.localSelecionadoService
        .salvar(
          texto,
          resultado
        );


      await this.router.navigate([
        '/contexto-do-dia'
      ]);

    } catch (erro) {

      console.error(
        'Erro ao buscar local:',
        erro
      );


      this.erro.set(
        'Não foi possível buscar esse local agora.'
      );

    } finally {

      this.carregando.set(false);

    }

  }


  protected voltarHome(): void {

    this.router.navigate([
      '/home'
    ]);

  }

}