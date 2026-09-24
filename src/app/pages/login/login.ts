import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy {

  constructor(
  private readonly router: Router
) {}

protected entrar(): void {
  this.router.navigate(['/home']);
}

protected criarConta(): void {
  this.router.navigate(['/home']);
}

  protected slideAtual = 0;

  protected modo: 'login' | 'cadastro' = 'login';

  private intervaloCarrossel?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervaloCarrossel = setInterval(() => {
      this.slideAtual = (this.slideAtual + 1) % 3;
    }, 5500);
  }

  protected mostrarCadastro(): void {
    this.modo = 'cadastro';
  }

  protected mostrarLogin(): void {
    this.modo = 'login';
  }

  ngOnDestroy(): void {
    if (this.intervaloCarrossel) {
      clearInterval(this.intervaloCarrossel);
    }
  }
}