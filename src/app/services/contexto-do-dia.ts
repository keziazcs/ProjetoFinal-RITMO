import { Injectable } from '@angular/core';
import { ContextoUsuario } from '../models/contexto-usuario';

@Injectable({
  providedIn: 'root'
})
export class ContextoDoDiaService {

  private contextoAtual: ContextoUsuario | null = null;

  salvarContexto(contexto: ContextoUsuario): void {
    this.contextoAtual = contexto;
  }

  obterContexto(): ContextoUsuario | null {
    return this.contextoAtual;
  }

  possuiContexto(): boolean {
    return this.contextoAtual !== null;
  }

  limparContexto(): void {
    this.contextoAtual = null;
  }
}