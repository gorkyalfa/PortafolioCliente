import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from './resultado-aprendizaje-asignatura.service';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proceso } from '../../entidades/proceso';
import { ResultadoAprendizaje } from '../../entidades/resultadoAprendizaje';
import { Evidencia } from '../../entidades/evidencia';

@Component({
  selector: 'app-resultado-aprendizaje-asignatura',
  templateUrl: './resultado-aprendizaje-asignatura.component.html'
})
export class ResultadoAprendizajeAsignaturaComponent implements OnInit {

  datos: Proceso[];
  resultados: ResultadoAprendizaje[];

  proceso: Proceso = {
    nombre: ''
  };

  resultado: ResultadoAprendizaje = {
    nombre: ''
  };

  evidencia: Evidencia;

  actualProceso: Proceso;
  edit: boolean = false;
  esSubProceso: any = null;

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

    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(dato => {
        this.esSubProceso = dato;
        if (this.esSubProceso > 1) {
          // this.createResultado();
          console.log(this.esSubProceso);
          this._servicio.createResultado({...this.resultado, proceso: this._servicio.actualProcesoId})
            .subscribe(
              res => {
                this.getResultados();
                this.alCrearOCancelar();
              },
              err => console.log(err)
            );
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
    this._servicio.getResultados(this._servicio.actualProcesoId)
      .subscribe( resultados => {
        this.resultados = resultados;
        console.log(resultados);
      });
  }

  createResultado() {
    if (this.resultados && this.resultados[0].evidenciaId) {
      this._servicio.createResultado({...this.resultado,
                                      evidenciaId: this.resultados[0].evidenciaId,
                                      proceso: this._servicio.actualProcesoId})
        .subscribe(
          res => {
            console.log(res);
            this.getResultados();
          },
          error => console.log(error)
        );
    } else {
      this._servicio.createEvidencia(this.evidencia)
        .subscribe(
          evidencia => {
            this._servicio.createResultado({...this.resultado, evidenciaId: evidencia.id, proceso: this._servicio.actualProcesoId})
              .subscribe(
                res => {
                  console.log(res);
                  this.getResultados();
                },
                error => console.log(error)
              );
            this.evidencia = evidencia;
          },
          err => console.log(err)
        );
    }
  }

  removeResultado(idResultado: number) {
    this._servicio.removeResultado(idResultado)
      .subscribe(
        res => {
          this.getResultados();
        },
        err => console.log(err)
      );
  }

  // Metodos de evidencia
  getEvidencia() {
    if (this.resultados) {
      this._servicio.getEvidencia(this.resultados[0].evidenciaId)
        .subscribe(res => {
          this.evidencia = res;
          console.log(res);
        });
    }
  }

  // Manejo del arbol
  seleccionarNodo($event) {
    this._servicio.setActualNodeId($event.node.id);
    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(ancestros => {
        this.esSubProceso = ancestros;
        if (ancestros > 1) {
          this._servicio.getResultados(this._servicio.actualProcesoId)
          .subscribe( data => {
            console.log(data);
          });
        }
      });
    console.log($event.node);
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
    this.resultado = {
      nombre: ''
    };
    this.modal.hide();
    this.procesoModal.hide();
  }

}
