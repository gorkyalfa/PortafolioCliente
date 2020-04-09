import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from './resultado-aprendizaje-asignatura.service';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Proceso } from '../../entidades/proceso';
import { ResultadoAprendizaje } from '../../entidades/resultadoAprendizaje';
import { Evidencia } from '../../entidades/evidencia';
import { NgxSpinnerService } from 'ngx-spinner';


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
  evidenciaReset: Evidencia;

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

  constructor(public _servicio: ResultadoAprendizajeAsignaturaService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProcesos();
  }

  // Metodos de proceso
  getProcesos() {
    this.spinner.show();
    this._servicio.getProcesos()
      .subscribe((data) => {
        this.datos = data;
        // console.log(this.datos);
        this.arbol.treeModel.update();
        this.spinner.hide();
      });
  }

  getProceso() {
    this.spinner.show();
    this._servicio.getProceso(this._servicio.actualProcesoId)
      .subscribe((data) => {
        this.actualProceso = data;
        this.spinner.hide();
      });
  }

  crearRaiz() {
    this.spinner.show();
    this._servicio.createProceso(this.proceso)
      .subscribe(
        res => {
          this.getProcesos();
          this.arbol.treeModel.update();
          this.alCrearOCancelar();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  crearProceso() {

    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(dato => {
        this.spinner.show();
        this.esSubProceso = dato;
        if (this.esSubProceso > 1) {
          this.createResultado();
          // console.log(this.esSubProceso);
        } else {
          this._servicio.createProceso({...this.proceso, procesoAncestro: this.actualProceso})
            .subscribe(
              res => {
                this.getProcesos();
                this.arbol.treeModel.update();
                this.alCrearOCancelar();
                this.spinner.hide();
              },
              err => console.log(err)
            );
        }
      });
  }

  actualizarProceso(id: number, dato: Proceso) {
    this.spinner.show();
    this._servicio.updateProceso(id, dato)
      .subscribe(
        res => {
          this.getProcesos();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  eliminarProceso() {
    this.spinner.show();
    this._servicio.deleteProceso(this._servicio.actualProcesoId)
      .subscribe(
        res => {
          this.getProcesos();
          this._servicio.actualProcesoId = null;
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  // Metodos de resultados
  getResultados() {
    this.spinner.show();
    this._servicio.getResultados(this._servicio.actualProcesoId)
      .subscribe( resultados => {
        this.resultados = resultados;
        console.log(resultados);
        this.getEvidencia();
        this.spinner.hide();
      });
  }

  createResultado() {
    this.spinner.show();
    if (this.resultados && this.resultados[0]) {
      this._servicio.createResultado({...this.resultado,
                                      evidenciaId: this.resultados[0].evidenciaId,
                                      proceso: this._servicio.actualProcesoId})
        .subscribe(
          res => {
            console.log(res);
            console.log('camino con resultado existente ' + this.resultados[0].evidenciaId);
            this.alCrearOCancelar();
            this.getResultados();
          },
          error => console.log(error)
        );

    } else {
      this._servicio.createEvidencia({nombre: ''})
        .subscribe(
          evidencia => {
            this._servicio.createResultado({...this.resultado,
                                            evidenciaId: evidencia.id,
                                            proceso: this._servicio.actualProcesoId})
              .subscribe(
                res => {
                  console.log(res);
                  console.log('camino con resultado inexistente ' + evidencia.id);
                  this.alCrearOCancelar();
                  this.getResultados();
                },
                error => console.log(error)
              );
            console.log(evidencia);
            this.evidencia = evidencia;
            this.spinner.hide();
          },
          err => console.log(err)
        );
    }
  }

  removeResultado(idResultado: number) {
    this.spinner.show();
    this._servicio.removeResultado(idResultado)
      .subscribe(
        res => {
          if (this.resultados.length === 1) {
            this.eliminarEvidencia(this.evidencia.id);
          }
          this.getResultados();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  // Metodos de evidencia
  getEvidencia() {
    this.spinner.show();
    if (this.resultados.length >= 1) {
      this._servicio.getEvidencia(this.resultados[0].evidenciaId)
        .subscribe(res => {
          this.evidencia = res;
          this.spinner.hide();
          console.log(res);
        });
    }
  }

  actualizarEvidencia(id: number) {
    this.spinner.show();
    this._servicio.updateEvidencia(id, this.evidencia)
      .subscribe(res => {
        this.getEvidencia();
        this.spinner.hide();
      });
  }

  eliminarEvidencia(id: number) {
    this.spinner.show();
    this._servicio.deleteEvidencia(id)
      .subscribe(res => {
        this.evidencia = this.evidenciaReset;
        this.spinner.hide();
        console.log(res);
      });
  }

  // Manejo del arbol
  seleccionarNodo($event) {
    this.spinner.show();
    this._servicio.setActualNodeId($event.node.id);
    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(ancestros => {
        this.esSubProceso = ancestros;
        if (ancestros > 1) {
          this.resultados = null;
          this.evidencia = null;
          this.getResultados();
        } else {
          this.evidencia = null;
          this.spinner.hide();
        }
      });
  }

  onMoveNode($event) {
    this.spinner.show();
    console.log(
      'Moved',
      $event.node.nombre,
      'to',
      $event.to.parent.nombre,
      'at index',
      $event.to.index);
      this.spinner.hide();
  }

  alCrearOCancelar() {
    this.spinner.show();
    this.proceso = {
      nombre: ''
    };
    this.resultado = {
      nombre: ''
    };
    this.modal.hide();
    this.procesoModal.hide();
    this.spinner.hide();
  }

}
