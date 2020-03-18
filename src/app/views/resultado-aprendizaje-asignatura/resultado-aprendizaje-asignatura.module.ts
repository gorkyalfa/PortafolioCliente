import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoAprendizajeAsignaturaRoutingModule } from './resultado-aprendizaje-asignatura-routing.module';
import { ResultadoAprendizajeAsignaturaComponent } from './resultado-aprendizaje-asignatura.component';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ResultadoAprendizajeAsignaturaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ResultadoAprendizajeAsignaturaRoutingModule,
    TreeModule.forRoot()
  ]
})
export class ResultadoAprendizajeAsignaturaModule { }
