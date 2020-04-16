import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'crear-silabo',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'crear-silabo',
        loadChildren: () => import('./views/crear-silabo/crear-silabo.module').then(m => m.CrearSilaboModule)
      },
      {
        path: 'resultado-aprendizaje-asignatura',
        loadChildren: () => import('./views/resultado-aprendizaje-asignatura/resultado-aprendizaje-asignatura.module').then(m => m.ResultadoAprendizajeAsignaturaModule)
      },
      {  path: 'contenido-asignatura',
        loadChildren: () => import('./views/contenido-asignatura/contenido-asignatura.module').then(m => m.ContenidoAsignaturaModule)
      },
      {
        path: 'descripcion-objetivos',
        loadChildren: () => import('./views/descripcion-objetivos/descripcion-objetivos.module').then(m => m.DescripcionObjetivosModule)
      },
      {
        path: 'estrategias-recursos',
        loadChildren: () => import('./views/estrategias-recursos/estrategias-recursos.module').then(m => m.EstrategiasRecursosModule)
      },
      {
        path: 'resultado-aprendizaje-perfil-carrera',
        loadChildren: () => import('./views/resultado-aprendizaje-perfil-carrera/resultado-aprendizaje-perfil-carrera.module').then(m => m.ResultadoAprendizajePerfilCarreraModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
