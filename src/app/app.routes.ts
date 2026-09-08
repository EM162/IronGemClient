import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component')
            .then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component')
            .then(m => m.RegisterComponent)
      }
    ]
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component')
        .then(m => m.ProfileComponent)
  },

  {
    path: '**',
    redirectTo: 'home'
  }

];

// import { Routes } from '@angular/router';

// export const routes: Routes = [

//   {
//     path: '',
//     redirectTo: 'auth/login',
//     pathMatch: 'full'
//   },

//   {
//     path: 'auth/login',
//     loadComponent: () =>
//       import('./features/auth/login/login.component')
//         .then(m => m.LoginComponent)
//   },

//   {
//     path: 'auth/register',
//     loadComponent: () =>
//       import('./features/auth/register/register.component')
//         .then(m => m.RegisterComponent)
//   },

//   {
//     path: '**',
//     redirectTo: 'auth/login'
//   }

// ];