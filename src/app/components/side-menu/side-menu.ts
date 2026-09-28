import {
  Component,
  inject,
  output
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css'
})
export class SideMenu {

  private readonly router =
    inject(Router);

  menuFechado =
    output<void>();


  protected fecharMenu(): void {

    this.menuFechado.emit();

  }


  protected navegar(
    rota: string
  ): void {

    this.menuFechado.emit();

    this.router.navigate([
      rota
    ]);

  }


  protected sair(): void {

    localStorage.removeItem(
      'ritmoLogado'
    );

    this.menuFechado.emit();

    this.router.navigate([
      '/login'
    ]);

  }

}