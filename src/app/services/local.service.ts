import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';


export interface BBox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}


export interface LocalEncontrado {
  lat: number;
  lon: number;
  bbox: BBox;
}


interface GeoapifyResultado {
  lat: number;
  lon: number;

  bbox: {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
  };
}


interface GeoapifyResposta {
  results: GeoapifyResultado[];
}


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private readonly baseUrl =
    'https://api.geoapify.com/v1/geocode/search';


  async buscarLocal(
    texto: string
  ): Promise<LocalEncontrado | null> {

    const busca = texto.trim();

    if (!busca) {
      return null;
    }


    const parametros = new URLSearchParams({
      text: busca,
      format: 'json',
      limit: '1',
      apiKey: environment.geoapifyApiKey
    });


    const resposta = await fetch(
      `${this.baseUrl}?${parametros.toString()}`
    );


    if (!resposta.ok) {

      throw new Error(
        `Erro ao buscar localização: ${resposta.status}`
      );

    }


    const dados =
      await resposta.json() as GeoapifyResposta;


    if (
      !dados.results ||
      dados.results.length === 0
    ) {

      return null;

    }


    const resultado =
      dados.results[0];


    return {
      lat: resultado.lat,
      lon: resultado.lon,

      bbox: {
        lon1: resultado.bbox.lon1,
        lat1: resultado.bbox.lat1,
        lon2: resultado.bbox.lon2,
        lat2: resultado.bbox.lat2
      }
    };

  }

}