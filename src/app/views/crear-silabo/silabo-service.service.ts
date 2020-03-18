import { Injectable } from '@angular/core';
import { Asignatura } from '../../entidades/asignatura';
import { ASIGNATURAS } from '../../mocks/mock-asignaturas'
import { COORREQUISITOASIGNATURAS } from '../../mocks/mock-correquisitosAsignatura'
import { PRERREQUISITOASIGNATURAS } from '../../mocks/mock-prerrequisitosAsignatura'
import { ALLASIGNATURAS } from "../../mocks/mock-allAsignaturas";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SilaboServiceService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAsignaturas(): Observable<Asignatura[]> {    
    return this.http.get<Asignatura[]>('http://localhost:3000/asignaturas');
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
