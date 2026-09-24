import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css'
})
export class SideMenu {

  @Output()
  fechar = new EventEmitter<void>();

  constructor(
    private readonly router: Router
  ) {}

  fecharMenu(): void {
    this.fechar.emit();
  }

  irParaInicio(): void {
    this.router.navigate(['/home']);
    this.fecharMenu();
  }

  irParaRitmo(): void {
    this.router.navigate(['/contexto-do-dia']);
    this.fecharMenu();
  }

  sair(): void {
    this.router.navigate(['/login']);
  }

}