import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadoAprendizajePerfilCarreraComponent } from './resultado-aprendizaje-perfil-carrera.component';

const routes: Routes = [
  {
    path: 'resultado-aprendizaje-perfil-carrera',
    component: ResultadoAprendizajePerfilCarreraComponent,
    data: {
      title: 'Resultados Perfil Carrera'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoAprendizajePerfilCarreraRoutingModule { }
