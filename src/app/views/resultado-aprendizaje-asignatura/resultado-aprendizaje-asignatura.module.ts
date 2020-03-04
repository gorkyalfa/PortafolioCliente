import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoAprendizajeAsignaturaRoutingModule } from './resultado-aprendizaje-asignatura-routing.module';
import { ResultadoAprendizajeAsignaturaComponent } from './resultado-aprendizaje-asignatura.component';

@NgModule({
  declarations: [
    ResultadoAprendizajeAsignaturaComponent
  ],
  imports: [
    CommonModule,
    ResultadoAprendizajeAsignaturaRoutingModule
  ]
})
export class ResultadoAprendizajeAsignaturaModule { }
