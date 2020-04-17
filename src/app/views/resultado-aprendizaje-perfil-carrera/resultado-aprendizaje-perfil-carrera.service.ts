import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoAprendizaje } from '../../entidades/resultadoAprendizaje';
import { HttpClient } from '@angular/common/http';
import { ResultadoAprendizajeAsignaturaService } from '../resultado-aprendizaje-asignatura/resultado-aprendizaje-asignatura.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajePerfilCarreraService extends ResultadoAprendizajeAsignaturaService {

  BASE_URL = 'http://localhost:3000';

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

}
