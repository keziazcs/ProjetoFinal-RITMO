import { Lugar } from './lugar';

export interface Roteiro {
  id: number | string;
  nome: string;

  lugares: Lugar[];

  duracaoTotal: number;
  custoTotal: number;
  distanciaTotal: number;

  intensidade: 'tranquilo' | 'moderado' | 'intenso';

  recomendadoPara: string[];

  fonte?: 'geoapify' | 'fallback';
}