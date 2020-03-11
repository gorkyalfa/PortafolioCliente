import { Injectable } from '@angular/core';
import { PROCESOS } from "../../mocks/mock-procesos";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajeAsignaturaService {

  nodos = PROCESOS;
  actual: any;
  constructor() { }

  getDatos(): Observable<any> {
    return of(this.nodos);
  }

  setActualNodeId(nodo: any) {
    this.actual = nodo;
  }

  getNodo(nodoParam: any): any {

    return this.nodos.find(nodo => nodoParam.id == nodo.id);

  }

}
