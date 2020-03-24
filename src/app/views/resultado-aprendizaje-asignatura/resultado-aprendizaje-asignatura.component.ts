import { Component, OnInit } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from './resultado-aprendizaje-asignatura.service';

@Component({
  selector: 'app-resultado-aprendizaje-asignatura',
  templateUrl: './resultado-aprendizaje-asignatura.component.html'
})
export class ResultadoAprendizajeAsignaturaComponent implements OnInit {

  datos: any;

  constructor(public _servicio: ResultadoAprendizajeAsignaturaService) { }

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {
    this._servicio.getDatos()
    .subscribe((datos) => {
      this.datos = datos;
    });
  }

  /*setIdAutomatico(nodo: any, indice: any): any {

    if(indice === nodo.length){
      return;
    }
    if (nodo.children) {
      for (let i = 0; i < nodo.children.length; i++) {

        console.log(nodo.children[i].id);
  
      }
    }
    
    this.setIdAutomatico(nodo, indice+1);

  } */
  idPred = 13;
  setIdAutomatico() {
    return this.idPred = this.idPred+1;
  }

  agregarRaiz(): void {
    this.datos.push({id: this.idPred, name: 'ejemplo', children: []});
    this.setIdAutomatico();
  }

  agregarProceso(): void {
    this.datos
    .find(dato => dato.id == this._servicio.actual)
    .children.push({name: 'hijo ejemplo', children: []});
  }

  eliminarNodo(): void {
    this.datos = this.datos.filter(dato => dato.id !== this._servicio.actual);
  }

}
