export interface Lugar {
  id: number | string;
  nome: string;
  categoria: string;

  duracaoMedia: number;
  custoMedio: number;

  nivelEsforco: 'leve' | 'moderado' | 'intenso';

  temDescanso: boolean;
  temEscadas: boolean;

  ambiente: 'interno' | 'externo';

  interesses: string[];

  lat?: number;
  lon?: number;
  endereco?: string;

  fonte?: 'geoapify' | 'fallback';
}