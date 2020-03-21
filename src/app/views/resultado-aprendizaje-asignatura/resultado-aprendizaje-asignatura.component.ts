import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from './resultado-aprendizaje-asignatura.service';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proceso } from '../../entidades/proceso';

@Component({
  selector: 'app-resultado-aprendizaje-asignatura',
  templateUrl: './resultado-aprendizaje-asignatura.component.html'
})
export class ResultadoAprendizajeAsignaturaComponent implements OnInit {

  datos: Proceso[];
  datosConResultados: Proceso[];

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
    childrenField: 'procesosDescendientes',
    actionMapping: {
      mouse: {
        drop: (tree: TreeModel, node: TreeNode, $event: any, {from , to}: {from: any, to: any}) => {
          // custom action. parameters: from = node, to = {parent, index}
          // this.actualizarProceso(this._servicio.actual, {index: to.index});
        }
      }
    }
  };

  constructor(public _servicio: ResultadoAprendizajeAsignaturaService) { }

  ngOnInit(): void {
    this.getProcesos();
  }

  // Metodos de proceso
  getProcesos() {
    this._servicio.getProcesos()
      .subscribe((data) => {
        this.datos = data;
        this.datosConResultados = data;
        this.getResultados();
        console.log(this.datos);
        this.arbol.treeModel.update();
      });
  }

  getProceso() {
    this._servicio.getProceso(this._servicio.actualProcesoId)
      .subscribe((data) => {
        this.actualProceso = data;
      });
  }

  crearRaiz() {
    this._servicio.createProceso(this.proceso)
      .subscribe(
        res => {
          this.getProcesos();
          this.arbol.treeModel.update();
          this.alCrearOCancelar();
        },
        err => console.log(err)
      );
  }

  crearProceso() {
    let  esSubProceso: any = null;

    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(dato => {
        esSubProceso = dato;
        if (esSubProceso > 1) {
          // this.createResultado();
          console.log(esSubProceso);
        } else {
          this._servicio.createProceso({...this.proceso, procesoAncestro: this.actualProceso})
            .subscribe(
              res => {
                this.getProcesos();
                this.arbol.treeModel.update();
                this.alCrearOCancelar();
              },
              err => console.log(err)
            );
        }
      });
  }

  actualizarProceso(id: number, dato: Proceso) {
    this._servicio.updateProceso(id, dato)
      .subscribe(
        res => {
          this.getProcesos();
        },
        err => console.log(err)
      );
  }

  eliminarProceso() {
    this._servicio.deleteProceso(this._servicio.actualProcesoId)
      .subscribe(
        res => {
          this.getProcesos();
          this._servicio.actualProcesoId = null;
        },
        err => console.log(err)
      );
  }

  // Metodos de resultados
  getResultados() {
    this._servicio.getResultados()
      .subscribe(datos => {
        this.datosConResultados.forEach(proceso => {
          proceso.procesosDescendientes.forEach((subProceso: Proceso) => {
            datos.forEach(resultado => {
              if (subProceso.id === resultado.id) {
                subProceso.procesosDescendientes = resultado.resultadosAprendizaje;
              }
            });
          });
        });
        this.arbol.treeModel.update();
      });
  }

  createResultado() {
    this._servicio.createResultado({...this.proceso, procesoAncestro: this._servicio.actualProcesoId})
      .subscribe(
        res => {
          console.log(res);
          this.getProcesos();
        },
        error => console.log(error)
      );
  }

  // Manejo del arbol
  seleccionarNodo($event) {
    this._servicio.setActualNodeId($event.node.id);
    console.log($event.node);
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

  alCrearOCancelar() {
    this.proceso = {
      nombre: ''
    };
    this.modal.hide();
  }

}
