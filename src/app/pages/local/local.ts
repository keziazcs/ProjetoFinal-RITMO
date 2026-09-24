import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  LocalService
} from '../../services/local.service';

import {
  LocalSelecionadoService
} from '../../services/local-selecionado.service';

import {
  ContextoDoDiaService
} from '../../services/contexto-do-dia';


@Component({
  selector: 'app-local',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './local.html',
  styleUrl: './local.css'
})
export class Local {

  private readonly localService =
    inject(LocalService);

  private readonly contextoService =
  inject(ContextoDoDiaService);  

  private readonly localSelecionadoService =
    inject(LocalSelecionadoService);

  private readonly router =
    inject(Router);


  protected readonly local =
    new FormControl('', {
      nonNullable: true
    });


  protected readonly carregando =
    signal(false);

  protected readonly erro =
    signal<string | null>(null);


  protected async continuar(): Promise<void> {

    const texto =
      this.local.value.trim();

    if (!texto) {

      this.erro.set(
        'Digite uma cidade ou local para continuar.'
      );

      return;
    }


    this.carregando.set(true);
    this.erro.set(null);


    try {

      const resultado =
        await this.localService.buscarLocal(
          texto
        );


      if (!resultado) {

        this.erro.set(
          'Não encontramos esse local. Tente escrever de outra forma.'
        );

        return;
      }


      this.localSelecionadoService.salvar(
  texto,
  resultado
);

this.contextoService.limparContexto();

await this.router.navigate([
  '/contexto-do-dia'
]);


      await this.router.navigate([
        '/contexto-do-dia'
      ]);


    } catch (erro) {

      console.error(
        'Erro ao buscar local:',
        erro
      );

      this.erro.set(
        'Não foi possível buscar o local agora. Tente novamente.'
      );


    } finally {

      this.carregando.set(false);

    }

  }


  protected voltar(): void {

    this.router.navigate([
      '/home'
    ]);

  }

}