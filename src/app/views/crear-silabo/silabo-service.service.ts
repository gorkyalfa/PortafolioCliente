import { Injectable } from '@angular/core';
import { Asignatura } from '../../entidades/asignatura';
import { ASIGNATURAS } from '../../mocks/mock-asignaturas';
import { PRERREQUISITOASIGNATURAS } from '../../mocks/mock-prerrequisitosAsignatura';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Silabo } from '../../entidades/silabo';

@Injectable({
  providedIn: 'root'
})
export class SilaboServiceService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSilabos(): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos`);
  }

  getSilaboAsignaturas(): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos/asignaturas`);
  }

  getSilaboCorrequisitos(id: number): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos/${id}/correquisitos`);
  }

  getSilaboPrerrequisitos(id: number): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos/${id}/prerrequisitos`);
  }

  getAsignatura(id: number): Observable<Silabo> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Silabo>(url)
  }

  getDescripcionObjetibo(id: number): Observable<Silabo> {
    return this.http.get<Silabo>(`${this.BASE_URL}/silabos/${id}/descripciones`);
  }
}
