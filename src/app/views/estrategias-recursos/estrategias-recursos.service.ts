import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Material } from '../../entidades/material';
import { TipoMaterial } from '../../entidades/tipoMaterial';
import { Finalidad } from '../../entidades/finalidad';
import { EstrategiaMetodologica } from '../../entidades/estrategiaMetodologica';

@Injectable({
  providedIn: 'root'
})
export class EstrategiasRecursosService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Metodos de materiales
  getMateriales(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.BASE_URL}/materiales/tipos/`);
  }

  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.BASE_URL}/materiales/`, material);
  }

  deleteMaterial(id: number): Observable<Material> {
    return this.http.delete<Material>(`${this.BASE_URL}/materiales/`);
  }

  // Metodos de tipos material
  getTiposMaterial(): Observable<TipoMaterial[]> {
    return this.http.get<TipoMaterial[]>(`${this.BASE_URL}/tipo-materiales`);
  }

  // Metodos de finalidad
  getFinalidades(): Observable<Finalidad[]> {
    return this.http.get<Finalidad[]>(`${this.BASE_URL}/finalidades/estrategia/`);
  }

  createFinalidad(finalidad: Finalidad): Observable<Finalidad> {
    return this.http.post<Finalidad>(`${this.BASE_URL}/finalidades/`, finalidad);
  }

  deleteFinalidad(id: number): Observable<Finalidad> {
    return this.http.delete<Finalidad>(`${this.BASE_URL}/finalidades/`);
  }

  // Metodos de recursos didacticos
  getEstrategiasMetodologicas(): Observable<EstrategiaMetodologica[]> {
    return this.http.get<EstrategiaMetodologica[]>(`${this.BASE_URL}/estrategias-metodologicas/`);
  }

  createEstrategiasMetodologicas(estrategiaMetodologica: EstrategiaMetodologica): Observable<EstrategiaMetodologica> {
    return this.http.post<EstrategiaMetodologica>(`${this.BASE_URL}/estrategias-metodologicas/`, estrategiaMetodologica);
  }

}
