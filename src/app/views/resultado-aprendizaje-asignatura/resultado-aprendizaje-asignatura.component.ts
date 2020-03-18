import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from './resultado-aprendizaje-asignatura.service';
import { TreeComponent } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proceso } from '../../entidades/proceso';

@Component({
  selector: 'app-resultado-aprendizaje-asignatura',
  templateUrl: './resultado-aprendizaje-asignatura.component.html'
})
export class ResultadoAprendizajeAsignaturaComponent implements OnInit {

  datos: Proceso[];

  proceso: Proceso = {
    nombre: ''
  };

  actualProceso: Proceso;
  edit: boolean = false;

  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('procesoModal') public procesoModal: ModalDirective;

  @ViewChild(TreeComponent)
  private arbol: TreeComponent;

  options = {
    allowDrag: true,
    allowDrop: true,
    displayField: 'nombre',
    childrenField: 'procesos'
  };

  constructor(public _servicio: ResultadoAprendizajeAsignaturaService) { }

  ngOnInit(): void {
    this.getProcesos();
  }

  getProcesos() {
    this._servicio.getProcesos()
    .subscribe((data) => {
      this.datos = data;
      console.log(data);
    });
  }

  getProceso() {
    this._servicio.getProceso(this._servicio.actual)
    .subscribe((data) => {
      this.actualProceso = data;
    });
  }

  crearRaiz() {
    this._servicio.createProceso({...this.proceso, mpath: null})
      .subscribe(
        res => {
          this.getProcesos();
          this.arbol.treeModel.update();
        },
        err => console.log(err)
      );
  }

  crearProceso() {
    this._servicio.createProceso({...this.proceso, proceso: this.actualProceso.id})
    .subscribe(
        res => {
          console.log({...this.proceso, proceso: this.actualProceso.id});
          this.getProcesos();
          this.arbol.treeModel.update();
        },
        err => console.log(err)
      );
  }

  actualizarProceso() {
    this._servicio.updateProceso(this.proceso.id, this.proceso)
      .subscribe(
        res => {
          console.log(res);
          this.getProcesos();
          this.arbol.treeModel.update();
        },
        err => console.log(err)
      );
  }

  eliminarProceso() {
    this._servicio.deleteProceso(this._servicio.actual)
      .subscribe(
        res => {
          this.getProcesos();
          this.arbol.treeModel.update();
          this._servicio.actual = null;
        },
        err => console.log(err)
      );
  }

  seleccionarNodo($event) {
    this._servicio.setActualNodeId($event.node.id);
    this.arbol.treeModel.update();
  }

  onMoveNode($event) {
    console.log(
      'Moved',
      $event.node.nombre,
      'to',
      $event.to.parent.nombre,
      'at index',
      $event.to.index);
  }

}
