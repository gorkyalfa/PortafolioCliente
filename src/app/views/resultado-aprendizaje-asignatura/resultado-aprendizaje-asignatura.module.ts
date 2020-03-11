import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoAprendizajeAsignaturaRoutingModule } from './resultado-aprendizaje-asignatura-routing.module';
import { ResultadoAprendizajeAsignaturaComponent } from './resultado-aprendizaje-asignatura.component';
import { TreeModule } from 'angular-tree-component';
import { ArbolContenidoComponent } from './arbol-contenido/arbol-contenido.component';

@NgModule({
  declarations: [
    ResultadoAprendizajeAsignaturaComponent,
    ArbolContenidoComponent
  ],
  imports: [
    CommonModule,
    ResultadoAprendizajeAsignaturaRoutingModule,
    TreeModule.forRoot()
  ]
})
export class ResultadoAprendizajeAsignaturaModule { }
