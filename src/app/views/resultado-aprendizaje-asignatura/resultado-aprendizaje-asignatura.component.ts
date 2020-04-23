import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ResultadoAprendizajeAsignaturaService } from './resultado-aprendizaje-asignatura.service';
import { Proceso } from '../../entidades/proceso';
import { ResultadoAprendizaje } from '../../entidades/resultadoAprendizaje';
import { Evidencia } from '../../entidades/evidencia';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GlobalConstants } from '../../common/global-constants';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-resultado-aprendizaje-asignatura',
  templateUrl: './resultado-aprendizaje-asignatura.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class ResultadoAprendizajeAsignaturaComponent implements OnInit {

  proceso: Proceso = {
    nombre: ''
  };
  resultado: ResultadoAprendizaje = {
    nombre: ''
  };

  alertas: any = [];
  datos: Proceso[];
  resultados: ResultadoAprendizaje[];

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
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }: { from: any, to: any }) => {
          // custom action. parameters: from = node, to = {parent, index}
          // this.actualizarProceso(this._servicio.actual, {index: to.index});
        }
      }
    }
  };

  constructor(public _servicio: ResultadoAprendizajeAsignaturaService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProcesos();
    console.log(GlobalConstants.silaboActual);
  }

  mostrarNotif(mensaje: string, error: boolean): void {
    this.alertas.push({
      type: 'info',
      msg: `${mensaje}`,
      timeout: 5000,
      error: error
    });
  }

  // Metodos de proceso
  getProcesos() {
    this.spinner.show();
    this._servicio.getProcesos(GlobalConstants.silaboActual)
      .subscribe(
        (data) => {
          this.datos = data;
          this.arbol.treeModel.update();
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó! Quizá no posee un sílabo en proceso.', true);
        }
      );
  }

  getProceso() {
    this.spinner.show();
    this._servicio.getProceso(this._servicio.actualProcesoId)
      .subscribe(
        (data) => {
          this.actualProceso = data;
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó!.', true);
        }
      );
  }

  crearRaiz() {
    this.spinner.show();
    this._servicio.createProceso({...this.proceso,
      silaboId: GlobalConstants.silaboActual})
      .subscribe(
        res => {
          this.getProcesos();
          this.arbol.treeModel.update();
          this.alCrearOCancelar();
          this.spinner.hide();
          this.mostrarNotif('Raíz creada exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

  crearProceso() {
    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(
        dato => {
          this.spinner.show();
          this.esSubProceso = dato;
          if (this.esSubProceso > 1) {
            this.crearEvidencia();
          } else {
            this._servicio.createProceso(
              { ...this.proceso, procesoAncestro: this.actualProceso }
            )
              .subscribe(
                res => {
                  this.getProcesos();
                  this.arbol.treeModel.update();
                  this.alCrearOCancelar();
                  this.spinner.hide();
                  this.mostrarNotif('Proceso creado exitosamente.', false);
                },
                err => {
                  this.spinner.hide();
                  this.mostrarNotif('Hubo un problema en la creación.', true);
                }
              );
          }
        }
      );
  }

  actualizarProceso(id: number, dato: Proceso) {
    this.spinner.show();
    this._servicio.updateProceso(id, dato)
      .subscribe(
        res => {
          this.getProcesos();
          this.spinner.hide();
        },
        err => {

        }
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
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  // Metodos de resultados
  getResultados() {
    this.spinner.show();
    this._servicio.getResultados(this._servicio.actualProcesoId)
      .subscribe(
        resultados => {
          this.resultados = resultados;
          if (resultados.length > 0) {
            this.getEvidencia(resultados[0].evidenciaId);
          }
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó!.', true);
        }
      );
  }

  crearResultado(evidenciaId: number) {
    this._servicio.createResultado({
      ...this.resultado,
      evidenciaId: evidenciaId,
      proceso: this._servicio.actualProcesoId
    })
      .subscribe(
        res => {
          // Camino con resultado inexistente
          this.alCrearOCancelar();
          this.getResultados();
          this.mostrarNotif('Resultado creado exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

  crearEvidencia() {
    this._servicio.createEvidencia({ nombre: '' })
        .subscribe(
          evidencia => {
            this.crearResultado(evidencia.id);
            this.evidencia = evidencia;
            this.spinner.hide();
            this.mostrarNotif('Evidencia creada exitosamente.', false);
          },
          err => {
            this.spinner.hide();
            this.mostrarNotif('Hubo un problema en la creación.', true);
          }
        );
  }

  // createResultado() {
  //   this.spinner.show();
  //   if (this.resultados && this.resultados[0]) {
  //     this._servicio.createResultado({
  //       ...this.resultado,
  //       evidenciaId: this.resultados[0].evidenciaId,
  //       proceso: this._servicio.actualProcesoId
  //     })
  //       .subscribe(
  //         res => {
  //           // Camino con resultado existente
  //           this.alCrearOCancelar();
  //           this.getResultados();
  //           this.mostrarNotif('Resultado creado exitosamente.', false);
  //         },
  //         err => {
  //           this.spinner.hide();
  //           this.mostrarNotif('Hubo un problema en la creación.', true);
  //         }
  //       );
  //   } else {
  //     this._servicio.createEvidencia({ nombre: '' })
  //       .subscribe(
  //         evidencia => {
  //           this._servicio.createResultado({
  //             ...this.resultado,
  //             evidenciaId: evidencia.id,
  //             proceso: this._servicio.actualProcesoId
  //           })
  //             .subscribe(
  //               res => {
  //                 // Camino con resultado inexistente
  //                 this.alCrearOCancelar();
  //                 this.getResultados();
  //                 this.mostrarNotif('Resultado creado exitosamente.', false);
  //               },
  //               err => {
  //                 this.spinner.hide();
  //                 this.mostrarNotif('Hubo un problema en la creación.', true);
  //               }
  //             );
  //           this.evidencia = evidencia;
  //           this.spinner.hide();
  //           this.mostrarNotif('Evidencia creada exitosamente.', false);
  //         },
  //         err => {
  //           this.spinner.hide();
  //           this.mostrarNotif('Hubo un problema en la creación.', true);
  //         }
  //       );
  //   }
  // }

  removeResultado(idResultado: number, idEvidencia: number) {
    this.spinner.show();
    this._servicio.removeResultado(idResultado)
      .subscribe(
        res => {
          // if (this.resultados.length === 1) {
          this.eliminarEvidencia(idEvidencia);
          // }
          this.getResultados();
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  // Metodos de evidencia
  getEvidencia(id: number) {
    this.spinner.show();
    if (this.resultados.length >= 1) {
      this._servicio.getEvidencia(id)
        .subscribe(res => {
          this.evidencia = res;
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
          err => {
            this.spinner.hide();
            this.mostrarNotif('¡Algo pasó!.', true);
          }
        );
    }
  }

  actualizarEvidencia(id: number) {
    this.spinner.show();
    this._servicio.updateEvidencia(id, this.evidencia)
      .subscribe(
        res => {
          this.getEvidencia(id);
          this.spinner.hide();
        }
      );
  }

  eliminarEvidencia(id: number) {
    this.spinner.show();
    this._servicio.deleteEvidencia(id)
      .subscribe(res => {
          this.evidencia = this.evidenciaReset;
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  // Manejo del arbol
  seleccionarNodo($event) {
    this.spinner.show();
    this._servicio.setActualNodeId($event.node.id);
    this._servicio.getProcesoAncestros(this._servicio.actualProcesoId)
      .subscribe(
        ancestros => {
          this.esSubProceso = ancestros;
          if (ancestros > 1) {
            this.resultados = null;
            this.evidencia = null;
            this.getResultados();
          } else {
            this.evidencia = null;
            this.spinner.hide();
          }
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  onMoveNode($event: any) {
    console.log(
      'Moved',
      $event.node.nombre,
      'to',
      $event.to.parent.nombre,
      'at index',
      $event.to.index);
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
