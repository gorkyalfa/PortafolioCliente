import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Descripcion } from '../../entidades/descripcion';
import { Silabo } from '../../entidades/silabo';


@Injectable({
  providedIn: 'root'
})
export class DescripcionObjetivosService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = 'http://localhost:3000';

  getDescripcion(id: number): Observable<Descripcion> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Descripcion>(url)
  }

  getDescripciones(): Observable<Descripcion[]> {
    return this.http.get<Descripcion[]>(`${this.BASE_URL}/descripciones/`);
  }

  getSilabo(id: number): Observable<Descripcion> {
    return this.http.get<Descripcion>(`${this.BASE_URL}/descripciones/${id}/silabo`);
  }

  createDescripcion(descripcion: Descripcion): Observable<Descripcion> {
    return this.http.post<Descripcion>(`${this.BASE_URL}/descripciones/`, descripcion);
  }  

  updateDescripcionSilabo(silabo: Silabo, id: number): Observable<Silabo> {
    return this.http.put<Silabo>(`${this.BASE_URL}/silabos/${id}`, silabo);
  }

}