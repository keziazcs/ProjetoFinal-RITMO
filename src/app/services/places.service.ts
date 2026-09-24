import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { ROTEIROS } from '../data/roteiros';


export interface LugarEncontrado {
  id: string;

  nome: string;

  categoria: string;

  categorias: string[];

  lat: number | null;
  lon: number | null;

  endereco: string | null;

  distanciaMetros: number | null;

  placeId: string | null;

  fonte: 'geoapify' | 'fallback';
}


interface GeoapifyPlaceProperties {
  name?: string;

  lat?: number;
  lon?: number;

  formatted?: string;

  categories?: string[];

  distance?: number;

  place_id?: string;
}


interface GeoapifyFeature {
  properties: GeoapifyPlaceProperties;
}


interface GeoapifyResposta {
  features: GeoapifyFeature[];
}


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly baseUrl =
    'https://api.geoapify.com/v2/places';


  async buscarLugares(
    lat: number,
    lon: number,
    categoria: string,
    raioMetros: number
  ): Promise<LugarEncontrado[]> {

    try {

      const lugaresApi =
        await this.buscarNaGeoapify(
          lat,
          lon,
          categoria,
          raioMetros
        );


      if (lugaresApi.length >= 3) {
        return lugaresApi;
      }


      return this.buscarFallback(
        categoria
      );

    } catch (erro) {

      console.error(
        'Erro ao consultar Geoapify Places:',
        erro
      );


      return this.buscarFallback(
        categoria
      );

    }

  }


  private async buscarNaGeoapify(
    lat: number,
    lon: number,
    categoria: string,
    raioMetros: number
  ): Promise<LugarEncontrado[]> {

    const filtro =
      `circle:${lon},${lat},${raioMetros}`;


    const bias =
      `proximity:${lon},${lat}`;


    const parametros =
      new URLSearchParams({

        categories: categoria,

        filter: filtro,

        bias: bias,

        limit: '20',

        lang: 'pt',

        apiKey:
          environment.geoapifyApiKey
      });


    const resposta =
      await fetch(
        `${this.baseUrl}?${parametros.toString()}`
      );


    if (!resposta.ok) {

      throw new Error(
        `Geoapify Places retornou status ${resposta.status}`
      );

    }


    const dados =
      await resposta.json() as GeoapifyResposta;


    if (
      !dados.features ||
      dados.features.length === 0
    ) {

      return [];

    }


    return dados.features
      .map(
        (
          feature,
          index
        ): LugarEncontrado | null => {

          const propriedades =
            feature.properties;


          /*
           * Sem nome não é útil para
           * apresentarmos ao usuário.
           */
          if (!propriedades.name) {
            return null;
          }


          return {

            id:
              propriedades.place_id ??
              `geoapify-${index}`,

            nome:
              propriedades.name,

            categoria,

            categorias:
              propriedades.categories ?? [],

            lat:
              propriedades.lat ?? null,

            lon:
              propriedades.lon ?? null,

            endereco:
              propriedades.formatted ?? null,

            distanciaMetros:
              propriedades.distance ?? null,

            placeId:
              propriedades.place_id ?? null,

            fonte:
              'geoapify'
          };

        }
      )
      .filter(
        (
          lugar
        ): lugar is LugarEncontrado =>
          lugar !== null
      );

  }


  private buscarFallback(
    categoria: string
  ): LugarEncontrado[] {

    const lugaresUnicos =
  new Map<string | number, LugarEncontrado>();


    for (const roteiro of ROTEIROS) {

      for (const lugar of roteiro.lugares) {

        /*
         * O fallback é mock/curado.
         * Não inventamos coordenadas,
         * endereço ou distância.
         */
        if (
          lugar.categoria === categoria ||
          lugar.interesses.includes(categoria)
        ) {

          lugaresUnicos.set(
            lugar.id,
            {
              id:
                `fallback-${lugar.id}`,

              nome:
                lugar.nome,

              categoria:
                lugar.categoria,

              categorias: [
                lugar.categoria,
                ...lugar.interesses
              ],

              lat: null,

              lon: null,

              endereco: null,

              distanciaMetros: null,

              placeId: null,

              fonte: 'fallback'
            }
          );

        }

      }

    }


    /*
     * Se a categoria da Geoapify
     * não possuir equivalente no mock,
     * ainda aplicamos o fallback exigido.
     */
    if (lugaresUnicos.size === 0) {

      for (const roteiro of ROTEIROS) {

        for (const lugar of roteiro.lugares) {

          lugaresUnicos.set(
            lugar.id,
            {
              id:
                `fallback-${lugar.id}`,

              nome:
                lugar.nome,

              categoria:
                lugar.categoria,

              categorias: [
                lugar.categoria,
                ...lugar.interesses
              ],

              lat: null,

              lon: null,

              endereco: null,

              distanciaMetros: null,

              placeId: null,

              fonte: 'fallback'
            }
          );

        }

      }

    }


    return Array.from(
      lugaresUnicos.values()
    );

  }

}