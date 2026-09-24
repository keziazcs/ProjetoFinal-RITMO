import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { BottomNav } from '../../components/bottom-nav/bottom-nav';
import { ROTEIROS } from '../../data/roteiros';

@Component({
  selector: 'app-home',
  imports: [
    BottomNav
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  protected slideAtual = 0;

  protected menuAberto = false;

  protected readonly destaques =
    ROTEIROS.slice(0, 3);

  private intervaloCarrossel?:
    ReturnType<typeof setInterval>;

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    this.intervaloCarrossel = setInterval(() => {

      this.slideAtual =
        (this.slideAtual + 1) % 3;

    }, 5500);

  }

  protected abrirMenu(): void {
    this.menuAberto = true;
  }

  protected fecharMenu(): void {
    this.menuAberto = false;
  }

  protected irParaRitmo(): void {

    this.router.navigate([
      '/local'
    ]);

  }

  protected sair(): void {
  this.router.navigate(['/login']);
}

  protected abrirRoteiro(
    id: number
  ): void {

    this.router.navigate([
      '/roteiro',
      id
    ]);

  }

  ngOnDestroy(): void {

    if (this.intervaloCarrossel) {
      clearInterval(
        this.intervaloCarrossel
      );
    }

  }

}