import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proceso } from '../../entidades/proceso';

import { ResultadoAprendizaje } from '../../entidades/resultadoAprendizaje';
import { Evidencia } from '../../entidades/evidencia';

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajeAsignaturaService {

  BASE_URL = 'http://localhost:3000';

  actualProcesoId: number;

  constructor(private http: HttpClient) { }

  // Solicitudes de entidad Proceso
  getProcesos(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(`${this.BASE_URL}/procesos/arboles`);
  }

  getProceso(id: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.BASE_URL}/procesos/${id}`);
  }

  // Se obtiene un numero que de ser 1, es raiz, para definir un limite de un nivel.
  getProcesoAncestros(id: number): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/procesos/${id}/ancestro`);
  }

  createProceso(proceso: Proceso): Observable<Proceso> {
    return this.http.post<Proceso>(`${this.BASE_URL}/procesos/`, proceso);
  }

  deleteProceso(id: number): Observable<Proceso> {
    return this.http.delete<Proceso>(`${this.BASE_URL}/procesos/remover/${id}`);
  }

  updateProceso(id: number, proceso: Proceso): Observable<Proceso> {
    return this.http.put<Proceso>(`${this.BASE_URL}/procesos/${id}`, proceso);
  }

  // Solicitudes de entidad ResultadosAprendizaje.
  // en la siguiente se consulta con relacion a un subproceso
  getResultados(id: number): Observable<ResultadoAprendizaje[]> {
    return this.http.get<ResultadoAprendizaje[]>(`${this.BASE_URL}/resultados-aprendizaje/${id}/proceso`);
  }

  createResultado(resultado: ResultadoAprendizaje): Observable<ResultadoAprendizaje> {
    return this.http.post<ResultadoAprendizaje>(`${this.BASE_URL}/resultados-aprendizaje/`, resultado);
  }

  removeResultado(id: number): Observable<ResultadoAprendizaje> {
    return this.http.delete<ResultadoAprendizaje>(`${this.BASE_URL}/resultados-aprendizaje/${id}`);
  }

  // Solicitudes de entidad Evidencias.
  // en la siguiente es consulta con relacion desde resultados.
  getEvidencias(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/resultados-aprendizaje/evidencia`);
  }

  getEvidencia(id: number): Observable<Evidencia> {
    return this.http.get<Evidencia>(`${this.BASE_URL}/evidencias/${id}`);
  }

  createEvidencia(evidencia: Evidencia): Observable<Evidencia> {
    return this.http.post<Evidencia>(`${this.BASE_URL}/evidencias/`, evidencia);
  }

  // Interaccion de arbol
  setActualNodeId(nodoId: number) {
    this.actualProcesoId = nodoId;
  }


}
