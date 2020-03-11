import { Component, Input, ViewChild } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from '../resultado-aprendizaje-asignatura.service';
import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-arbol-contenido',
  template: '<tree-root #arbol (activate)="seleccionarNodo($event)" (moveNode)="onMoveNode($event)" [nodes]="nodos" [options]="options"></tree-root>'
})  
export class ArbolContenidoComponent {
  
  constructor(public servicio: ResultadoAprendizajeAsignaturaService) { }

  @Input() nodos: any;

  @ViewChild(TreeComponent)
  private arbol: TreeComponent;

  options = {
    allowDrag: true,
    allowDrop: true
  };

  seleccionarNodo($event) {
    this.servicio.setActualNodeId($event.node.id);
    console.log(this.servicio.actual);
    this.arbol.treeModel.update();
    console.log(this.servicio.getNodo(this.servicio.actual));
  }

  onMoveNode($event) {
    console.log(
      "Moved",
      $event.node.name,
      "to",
      $event.to.parent.name,
      "at index",
      $event.to.index);
  }
  

}
