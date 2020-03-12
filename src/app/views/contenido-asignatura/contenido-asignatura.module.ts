import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ContenidoAsignaturaComponent } from './contenido-asignatura.component';
import { ContenidoAsignaturaRoutingModule } from './contenido-asignatura-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContenidoAsignaturaRoutingModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ ContenidoAsignaturaComponent ]
})
export class ContenidoAsignaturaModule { }


