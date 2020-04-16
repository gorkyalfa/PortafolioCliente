import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoAprendizajePerfilCarreraComponent } from './resultado-aprendizaje-perfil-carrera.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [ResultadoAprendizajePerfilCarreraComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AlertModule.forRoot()
  ]
})
export class ResultadoAprendizajePerfilCarreraModule { }
