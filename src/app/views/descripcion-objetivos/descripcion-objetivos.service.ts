import { Injectable } from '@angular/core';
import { Asignatura } from '../../entidades/asignatura';
import { ASIGNATURAS } from '../../mocks/mock-asignaturas'
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DescripcionObjetivosService {

   getAsignaturas(): Observable<Asignatura[]> {
    return of(ASIGNATURAS);
  }

  getAsignatura(id: number): Observable<Asignatura> {
    return of(ASIGNATURAS.find(asignatura => asignatura.id === id));
  }

}