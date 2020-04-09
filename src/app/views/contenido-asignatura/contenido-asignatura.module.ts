import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ContenidoAsignaturaComponent } from './contenido-asignatura.component';
import { ContenidoAsignaturaRoutingModule } from './contenido-asignatura-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContenidoAsignaturaRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ContenidoAsignaturaComponent ]
})
export class ContenidoAsignaturaModule { }



