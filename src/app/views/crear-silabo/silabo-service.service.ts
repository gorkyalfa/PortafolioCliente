import { Injectable } from '@angular/core';
import { Asignatura } from '../../entidades/asignatura';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Silabo } from '../../entidades/silabo';

@Injectable({
  providedIn: 'root'
})
export class SilaboServiceService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.BASE_URL}/asignaturas`);
  }

  getAsignatura(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.BASE_URL}/asignaturas/${id}`);
  }

  getCorrequisitos(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.BASE_URL}/requisitos/co/${asignatura.id}/asignatura/`);
  }

  getPrerequisitos(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.BASE_URL}/requisitos/pre/${asignatura.id}/asignatura/`);
  }

  createSilabo(silabo: Silabo): Observable<Silabo> {
    return this.http.post<Silabo>(`${this.BASE_URL}/silabos/`, silabo);
  }

  getSilabos(): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos/plectivo`);
  }

  /*sgetSilaboAsignaturas(): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos/asignaturas`);
  }


  getSilaboPrerrequisitos(id: number): Observable<Silabo[]> {
    return this.http.get<Silabo[]>(`${this.BASE_URL}/silabos/${id}/prerrequisitos`);
  }

  getDescripcionObjetibo(id: number): Observable<Silabo> {
    return this.http.get<Silabo>(`${this.BASE_URL}/silabos/${id}/descripciones`);
  }

  createDescripcion(descripcion: Descripcion): Observable<Descripcion> {
    return this.http.post<Descripcion>(`${this.BASE_URL}/descripciones/`, descripcion);
  }

  updateDescripcionSilabo(descripcion: Descripcion, id: number): Observable<Descripcion> {
    return this.http.put<Descripcion>(`${this.BASE_URL}/descripciones/${id}`, descripcion);
  }*/
}
