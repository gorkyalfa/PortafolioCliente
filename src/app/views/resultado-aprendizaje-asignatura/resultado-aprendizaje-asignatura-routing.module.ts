import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadoAprendizajeAsignaturaComponent } from './resultado-aprendizaje-asignatura.component';

const routes: Routes = [
  {
    path: '',
    component: ResultadoAprendizajeAsignaturaComponent,
    data: {
      title: 'Resultado Aprendizaje Asignatura'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResultadoAprendizajeAsignaturaRoutingModule { }
