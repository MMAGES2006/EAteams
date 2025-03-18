import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'contrasenia',
    loadComponent: () => import('./contrasenia/contrasenia.page').then( m => m.ContraseniaPage)
  },
  {
    path: 'resgistro',
    loadComponent: () => import('./resgistro/resgistro.page').then( m => m.ResgistroPage)
  },
  {
    path: 'tareas',
    loadComponent: () => import('./tareas/tareas.page').then( m => m.TareasPage)
  },
];
