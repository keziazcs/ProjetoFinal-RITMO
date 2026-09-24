import { Roteiro } from '../models/roteiro';

export const ROTEIROS: Roteiro[] = [

  {
    id: 1,
    nome: 'Salvador Histórico sem Pressa',

    lugares: [
      {
        id: 1,
        nome: 'Pelourinho',
        categoria: 'cultura',
        duracaoMedia: 90,
        custoMedio: 0,
        nivelEsforco: 'moderado',
        temDescanso: true,
        temEscadas: true,
        ambiente: 'externo',
        interesses: ['cultura', 'historia', 'fotografia']
      },

      {
        id: 2,
        nome: 'Elevador Lacerda',
        categoria: 'historia',
        duracaoMedia: 30,
        custoMedio: 0,
        nivelEsforco: 'leve',
        temDescanso: false,
        temEscadas: false,
        ambiente: 'interno',
        interesses: ['historia', 'fotografia']
      },

      {
        id: 3,
        nome: 'Mercado Modelo',
        categoria: 'cultura',
        duracaoMedia: 60,
        custoMedio: 30,
        nivelEsforco: 'leve',
        temDescanso: true,
        temEscadas: false,
        ambiente: 'interno',
        interesses: ['cultura', 'gastronomia', 'compras']
      }
    ],

    duracaoTotal: 4,
    custoTotal: 50,
    distanciaTotal: 1.8,

    intensidade: 'tranquilo',

    recomendadoPara: [
      'sozinho',
      'casal',
      'familia'
    ]
  },


  {
    id: 2,
    nome: 'Rio Vermelho Cultural',

    lugares: [
      {
        id: 4,
        nome: 'Casa do Rio Vermelho',
        categoria: 'cultura',
        duracaoMedia: 90,
        custoMedio: 20,
        nivelEsforco: 'leve',
        temDescanso: true,
        temEscadas: false,
        ambiente: 'interno',
        interesses: ['literatura', 'cultura', 'historia']
      },

      {
        id: 5,
        nome: 'Rio Vermelho',
        categoria: 'gastronomia',
        duracaoMedia: 120,
        custoMedio: 80,
        nivelEsforco: 'leve',
        temDescanso: true,
        temEscadas: false,
        ambiente: 'externo',
        interesses: ['gastronomia', 'cultura', 'fotografia']
      }
    ],

    duracaoTotal: 4,
    custoTotal: 100,
    distanciaTotal: 1.4,

    intensidade: 'tranquilo',

    recomendadoPara: [
      'sozinho',
      'casal',
      'amigos',
      'familia'
    ]
  },


  {
    id: 3,
    nome: 'Barra em Movimento',

    lugares: [
      {
        id: 6,
        nome: 'Porto da Barra',
        categoria: 'praia',
        duracaoMedia: 120,
        custoMedio: 40,
        nivelEsforco: 'moderado',
        temDescanso: true,
        temEscadas: false,
        ambiente: 'externo',
        interesses: ['praia', 'natureza', 'fotografia']
      },

      {
        id: 7,
        nome: 'Farol da Barra',
        categoria: 'historia',
        duracaoMedia: 90,
        custoMedio: 20,
        nivelEsforco: 'moderado',
        temDescanso: true,
        temEscadas: true,
        ambiente: 'externo',
        interesses: ['historia', 'fotografia', 'natureza']
      }
    ],

    duracaoTotal: 5,
    custoTotal: 80,
    distanciaTotal: 3.2,

    intensidade: 'moderado',

    recomendadoPara: [
      'sozinho',
      'casal',
      'amigos'
    ]
  }

];