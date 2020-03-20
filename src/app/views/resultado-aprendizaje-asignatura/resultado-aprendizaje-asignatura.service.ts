import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proceso } from '../../entidades/proceso';

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajeAsignaturaService {

  BASE_URL = 'http://localhost:3000';

  actual: number;

  constructor(private http: HttpClient) { }

  getProcesos(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(`${this.BASE_URL}/procesos/padres`);
  }

  getProceso(id: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.BASE_URL}/procesos/${id}`);
  }

  getProcesoAncestro(id: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.BASE_URL}/procesos/hijo/${id}`);
  }

  createProceso(proceso: Proceso): Observable<Proceso> {
    return this.http.post<Proceso>(`${this.BASE_URL}/procesos/`, proceso);
  }

  deleteProceso(id: number): Observable<Proceso> {
    console.log(id);
    return this.http.delete<Proceso>(`${this.BASE_URL}/procesos/${id}`);
  }

  updateProceso(id: number, proceso: Proceso): Observable<Proceso> {
    return this.http.put<Proceso>(`${this.BASE_URL}/procesos/${id}`, proceso);
  }

  setActualNodeId(nodoId: number) {
    this.actual = nodoId;
  }

}
