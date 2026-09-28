import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import { environment }
  from '../../environments/environment';


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
  fonte: 'geoapify';
}


interface GeoapifyFeature {
  properties?: {
    name?: string;
    formatted?: string;
    categories?: string[];
    lat?: number;
    lon?: number;
    place_id?: string;
    distance?: number;
  };
}


interface GeoapifyResponse {
  features?: GeoapifyFeature[];
}


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'https://api.geoapify.com/v2/places';


  buscarLugares(
    lat: number,
    lon: number,
    raioMetros = 8000
  ): Observable<LugarEncontrado[]> {

    const params =
      new HttpParams()

        .set(
          'categories',
          [
            'tourism',
            'entertainment',
            'catering'
          ].join(',')
        )

        .set(
          'filter',
          `circle:${lon},${lat},${raioMetros}`
        )

        .set(
          'bias',
          `proximity:${lon},${lat}`
        )

        .set(
          'limit',
          '20'
        )

        .set(
          'lang',
          'pt'
        )

        .set(
          'apiKey',
          environment.geoapifyApiKey
        );


    return this.http
      .get<GeoapifyResponse>(
        this.apiUrl,
        { params }
      )
      .pipe(

        map(response => {

          const features =
            response.features ?? [];


          return features
            .map(
              (
                feature,
                index
              ): LugarEncontrado | null => {

                const properties =
                  feature.properties;


                if (!properties) {
                  return null;
                }


                const nome =
                  properties.name
                  ?? properties.formatted
                  ?? 'Local sem nome';


                const categorias =
                  properties.categories
                  ?? [];


                const categoria =
                  categorias[0]
                  ?? 'local';


                return {

                  id:
                    properties.place_id
                    ?? `geoapify-${index}`,

                  nome,

                  categoria,

                  categorias,

                  lat:
                    properties.lat
                    ?? null,

                  lon:
                    properties.lon
                    ?? null,

                  endereco:
                    properties.formatted
                    ?? null,

                  distanciaMetros:
                    properties.distance
                    ?? null,

                  placeId:
                    properties.place_id
                    ?? null,

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

        })

      );

  }

}