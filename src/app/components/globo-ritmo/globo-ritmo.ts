import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import createGlobe from 'cobe';

@Component({
  selector: 'app-globo-ritmo',
  imports: [],
  templateUrl: './globo-ritmo.html',
  styleUrl: './globo-ritmo.css'
})
export class GloboRitmo
  implements AfterViewInit, OnDestroy {

  @ViewChild('globe')
  private canvas!: ElementRef<HTMLCanvasElement>;

  private globe?: ReturnType<typeof createGlobe>;

  private phi = 0;

  ngAfterViewInit(): void {

    const canvas =
      this.canvas.nativeElement;

    const tamanho = 520;

    const options = {

  devicePixelRatio: 2,

  width: tamanho * 2,
  height: tamanho * 2,

  phi: 0,
  theta: 0.25,

  dark: 0,
  diffuse: 1.2,
  scale: 1,

  mapSamples: 16000,
  mapBrightness: 6,

  baseColor: [
    0.30,
    0.30,
    0.30
  ] as [number, number, number],

  markerColor: [
    0.57,
    0.80,
    1
  ] as [number, number, number],

  glowColor: [
    0.75,
    0.90,
    0.80
  ] as [number, number, number],

  offset: [
    0,
    0
  ] as [number, number],

  markers: [
    {
      location: [
        -12.9714,
        -38.5014
      ] as [number, number],
      size: 0.08
    },

    {
      location: [
        -23.5505,
        -46.6333
      ] as [number, number],
      size: 0.06
    },

    {
      location: [
        -22.9068,
        -43.1729
      ] as [number, number],
      size: 0.06
    },

    {
      location: [
        38.7223,
        -9.1393
      ] as [number, number],
      size: 0.06
    },

    {
      location: [
        41.9028,
        12.4964
      ] as [number, number],
      size: 0.06
    }
  ],

  onRender: (state: any) => {

    state.phi = this.phi;

    this.phi += 0.003;

  }

} as any;

    this.globe =
      createGlobe(
        canvas,
        options
      );

  }

  ngOnDestroy(): void {

    this.globe?.destroy();

  }

}