import {
  Injectable,
  signal
} from '@angular/core';

import {
  LocalEncontrado
} from './local.service';


export interface LocalSelecionado {
  nomeExibicao: string;
  coordenadas: LocalEncontrado;
}


@Injectable({
  providedIn: 'root'
})
export class LocalSelecionadoService {

  private readonly localAtualSignal =
    signal<LocalSelecionado | null>(null);

  readonly localAtual =
    this.localAtualSignal.asReadonly();


  salvar(
    nomeExibicao: string,
    coordenadas: LocalEncontrado
  ): void {

    this.localAtualSignal.set({
      nomeExibicao: nomeExibicao.trim(),
      coordenadas
    });
  }


  obter(): LocalSelecionado | null {

    return this.localAtualSignal();
  }


  possuiLocal(): boolean {

    return this.localAtualSignal() !== null;
  }


  limpar(): void {

    this.localAtualSignal.set(null);
  }

}