import { Routes } from '@angular/router';

import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Local } from './pages/local/local';
import { ContextoDoDia } from './pages/contexto-do-dia/contexto-do-dia';
import { Roteiros } from './pages/roteiros/roteiros';
import { Roteiro } from './pages/roteiro/roteiro';
import { Feed } from './pages/feed/feed';
import { Favoritos } from './pages/favoritos/favoritos';
import { Grupos } from './pages/grupos/grupos';
import { Perfil } from './pages/perfil/perfil';

export const routes: Routes = [

  {
    path: '',
    component: Landing
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
    path: 'feed',
    component: Feed
  },

  {
    path: 'favoritos',
    component: Favoritos
  },

  {
    path: 'grupos',
    component: Grupos
  },

  {
    path: 'perfil',
    component: Perfil
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