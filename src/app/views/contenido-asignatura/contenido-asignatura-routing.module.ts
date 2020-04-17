import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoAsignaturaComponent } from './contenido-asignatura.component';

const routes: Routes = [
  {
    path: '',
    component: ContenidoAsignaturaComponent,
    data: {
      title: 'Contenido Asignatura'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoAsignaturaRoutingModule { }






