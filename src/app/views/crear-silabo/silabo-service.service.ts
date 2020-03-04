import { Injectable } from '@angular/core';
import { Asignatura } from '../../entidades/asignatura';
import { ASIGNATURAS } from '../../mocks/mock-asignaturas'
import { COORREQUISITOASIGNATURAS } from '../../mocks/mock-correquisitosAsignatura'
import { PRERREQUISITOASIGNATURAS } from '../../mocks/mock-prerrequisitosAsignatura'
import { ALLASIGNATURAS } from "../../mocks/mock-allAsignaturas";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SilaboServiceService {

  constructor() { }

  getAsignaturas(): Observable<Asignatura[]> {
    return of(ASIGNATURAS);
  }

  getCorrequisitos(): Observable<Asignatura[]> {
    return of(COORREQUISITOASIGNATURAS);
  }

  getPrerrequisitos(): Observable<Asignatura[]> {
    return of(PRERREQUISITOASIGNATURAS);
  }

  getAllAsignaturas(): Observable<Asignatura[]> {
    //esto debe traer todas las asignaturas de todos los periodos existentes   
    return of(ALLASIGNATURAS);
  }

  getAsignatura(id: number): Observable<Asignatura> {
    return of(ASIGNATURAS.find(asignatura => asignatura.id === id));
  }

}
