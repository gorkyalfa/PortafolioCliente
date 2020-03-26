import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contenido } from '../../entidades/contenido';
import { Unidad } from '../../entidades/unidad';
import { Semana } from '../../entidades/semana';

@Injectable({
  providedIn: 'root'
})
export class ContenidoAsignaturaService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Metodos de entidad contenido
  getContenidos(): Observable<Contenido[]> {
    return this.http.get<Contenido[]>(`${this.BASE_URL}/contenidos`);
  }

  getContenido(id: number): Observable<Contenido> {
    return this.http.get<Contenido>(`${this.BASE_URL}/contenidos/${id}`);
  }

  createContenido(contenido: Contenido): Observable<Contenido> {
    return this.http.post<Contenido>(`${this.BASE_URL}/contenidos/`, contenido);
  }

  updateContenido(contenido: Contenido, id: number): Observable<Contenido> {
    return this.http.put<Contenido>(`${this.BASE_URL}/contenidos/${id}`, contenido);
  }

  deleteContenido(id: number): Observable<Contenido> {
    return this.http.delete<Contenido>(`${this.BASE_URL}/contenidos/${id}`);
  }

  // Metodos de entidad unidad
  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.BASE_URL}/unidades/`);
  }

  getUnidad(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.BASE_URL}/unidades/${id}`);
  }

  createUnidad(unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(`${this.BASE_URL}/unidades`, unidad);
  }

  updateUnidad(unidad: Unidad, id: number): Observable<Unidad> {
    return this.http.put<Unidad>(`${this.BASE_URL}/unidades/${id}`, unidad);
  }

  deleteUnidad(id: number): Observable<Unidad> {
    return this.http.delete<Unidad>(`${this.BASE_URL}/unidades/${id}`);
  }

  // Metodos de entidad semana
  getSemanas(): Observable<Semana[]> {
    return this.http.get<Semana[]>(`${this.BASE_URL}/semanas/`);
  }

  getSemana(id: number): Observable<Semana> {
    return this.http.get<Semana>(`${this.BASE_URL}/semanas/${id}`);
  }

  createSemana(semana: Semana): Observable<Semana> {
    return this.http.post<Semana>(`${this.BASE_URL}/semanas/`, semana);
  }

  updateSemana(semana: Semana, id: number): Observable<Semana> {
    return this.http.put<Semana>(`${this.BASE_URL}/semanas/${id}`, semana);
  }

  deleteSemana(id: number): Observable<Semana> {
    return this.http.delete<Semana>(`${this.BASE_URL}/semanas/${id}`);
  }

}
