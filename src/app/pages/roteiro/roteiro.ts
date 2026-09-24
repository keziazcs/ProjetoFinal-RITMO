import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROTEIROS } from '../../data/roteiros';
import { Roteiro as RoteiroModel } from '../../models/roteiro';

@Component({
  selector: 'app-roteiro',
  imports: [],
  templateUrl: './roteiro.html',
  styleUrl: './roteiro.css'
})
export class Roteiro {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  roteiro: RoteiroModel | null = null;

  constructor() {

    const idTexto =
      this.route.snapshot.paramMap.get('id');

    if (!idTexto) {
      this.router.navigate(['/roteiros']);
      return;
    }

    const id = Number(idTexto);

    if (Number.isNaN(id)) {
      this.router.navigate(['/roteiros']);
      return;
    }

    this.roteiro =
      ROTEIROS.find(
        roteiro => roteiro.id === id
      ) ?? null;

    if (!this.roteiro) {
      this.router.navigate(['/roteiros']);
    }
  }

  voltar(): void {
    this.router.navigate(['/roteiros']);
  }

  comecarDia(): void {

    if (!this.roteiro) {
      return;
    }

    this.router.navigate([
      '/roteiro',
      this.roteiro.id,
      'execucao'
    ]);
  }

}