import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { ContextoDoDia } from './pages/contexto-do-dia/contexto-do-dia';
import { Roteiros } from './pages/roteiros/roteiros';
import { Roteiro } from './pages/roteiro/roteiro';
import { Local } from './pages/local/local';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'local',
    component: Local
  },
  {
    path: 'contexto-do-dia',
    component: ContextoDoDia
  },
  {
    path: 'roteiros',
    component: Roteiros
  },
  {
    path: 'roteiro/:id',
    component: Roteiro
  }
];