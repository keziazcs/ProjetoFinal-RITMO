import { Injectable } from '@angular/core';

import { ContextoUsuario } from '../models/contexto-usuario';
import { Roteiro } from '../models/roteiro';

@Injectable({
  providedIn: 'root'
})
export class RitmoService {

  calcularCompatibilidade(
    roteiro: Roteiro,
    usuario: ContextoUsuario
  ): number {

    let pontos = 0;

    // TEMPO
    if (roteiro.duracaoTotal <= usuario.tempoDisponivel) {
      pontos += 20;
    }

    // ORÇAMENTO
    if (roteiro.custoTotal <= usuario.orcamento) {
      pontos += 15;
    }

    // ENERGIA
    if (
      usuario.energia === 'baixa' &&
      roteiro.intensidade === 'tranquilo'
    ) {
      pontos += 20;
    }

    if (
      usuario.energia === 'media' &&
      roteiro.intensidade === 'moderado'
    ) {
      pontos += 20;
    }

    if (
      usuario.energia === 'alta' &&
      roteiro.intensidade === 'intenso'
    ) {
      pontos += 20;
    }

    // COMPANHIA
    if (
      roteiro.recomendadoPara.includes(usuario.companhia)
    ) {
      pontos += 10;
    }

    // INTERESSES
    usuario.interesses.forEach(interesse => {

      const combina = roteiro.lugares.some(
        lugar => lugar.interesses.includes(interesse)
      );

      if (combina) {
        pontos += 10;
      }

    });

    // POUCA CAMINHADA
    if (
      usuario.preferePoucaCaminhada &&
      roteiro.distanciaTotal <= 2
    ) {
      pontos += 15;
    }

    return pontos;
  }


  recomendarRoteiro(
    roteiros: Roteiro[],
    usuario: ContextoUsuario
  ): Roteiro | null {

    
    if (roteiros.length === 0) {
      return null;
    }
    

    return roteiros
      .map(roteiro => ({
        roteiro,
        pontos: this.calcularCompatibilidade(
          roteiro,
          usuario
        )
      }))
      .sort(
        (a, b) => b.pontos - a.pontos
      )[0].roteiro;
  }
  buscarCompativeis(
  roteiros: Roteiro[],
  usuario: ContextoUsuario
): Roteiro[] {

  return roteiros
    .map(roteiro => ({
      roteiro,
      pontos: this.calcularCompatibilidade(
        roteiro,
        usuario
      )
    }))
    .sort(
      (a, b) => b.pontos - a.pontos
    )
    .slice(0, 3)
    .map(item => item.roteiro);

}
}