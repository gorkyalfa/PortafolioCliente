import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { SilaboServiceService } from '../silabo-service.service';
import { Silabo } from '../../../entidades/silabo';
import { DescripcionObjetivosService } from '../../descripcion-objetivos/descripcion-objetivos.service';
import { ResultadoAprendizajeAsignaturaService } from '../../resultado-aprendizaje-asignatura/resultado-aprendizaje-asignatura.service';
import { ContenidoAsignaturaService } from '../../contenido-asignatura/contenido-asignatura.service';
import { EstrategiasRecursosService } from '../../estrategias-recursos/estrategias-recursos.service';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';
import { GlobalConstants } from '../../../common/global-constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Proceso } from '../../../entidades/proceso';
import { ResultadoAprendizaje } from '../../../entidades/resultadoAprendizaje';
import { Evidencia } from '../../../entidades/evidencia';
import { Semana } from '../../../entidades/semana';
import { Unidad } from '../../../entidades/unidad';
import { Contenido } from '../../../entidades/contenido';
import { Material } from '../../../entidades/material';
import { TipoMaterial } from '../../../entidades/tipoMaterial';
import { EstrategiaMetodologica } from '../../../entidades/estrategiaMetodologica';
import { GlobalConstantsService } from '../../../global-constants.service';

@Component({
  selector: 'app-ver-silabo',
  templateUrl: './ver-silabo.component.html',
})
export class VerSilaboComponent implements OnInit {

  isCollapsed: boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  isCollapsed4: boolean = true;
  isCollapsed5: boolean = true;
  isCollapsed6: boolean = true;
  isCollapsed7: boolean = true;
  datos: Proceso[];
  resultados: ResultadoAprendizaje[];
  actualProceso: Proceso;
  esSubProceso: any = null;
  evidencia: Evidencia;
  resultadoActual: ResultadoAprendizaje;
  actualSilaboId: number = GlobalConstantsService.silaboActual;
  materiales: Material[];
  tiposMaterial: TipoMaterial[];
  estrategias: EstrategiaMetodologica[];
  semanas: Semana[];
  unidades: Unidad[];
  silabo: Silabo = this.silaboService.silaboActual;
  correquisito: any[];
  prerequisito: any[];

  contenido: Contenido;
  @ViewChild(TreeComponent)
  private arbol: TreeComponent;

  options = {
    displayField: 'nombre',
    childrenField: 'procesosDescendientes',
  };

  constructor(
    public silaboService: SilaboServiceService,
    private resultadosService: ResultadoAprendizajeAsignaturaService,
    private contenidosAsignaturaService: ContenidoAsignaturaService,
    private recursosService: EstrategiasRecursosService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getProcesos();
    this.getContenidos();
    this.getUnidades();
    this.getTiposMaterial();
    this.getMateriales();
    this.getEstrategias();
  }

  // RESULTADOS APRENDIZAJE
  getProcesos() {
    this.spinner.show();
    this.resultadosService.getProcesos(GlobalConstantsService.silaboActual)
      .subscribe(
        (data) => {
          this.datos = data;
          this.arbol.treeModel.update();
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  getProceso() {
    this.spinner.show();
    this.resultadosService.getProceso(this.resultadosService.actualProcesoId)
      .subscribe(
        (data) => {
          this.actualProceso = data;
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  getResultados() {
    this.spinner.show();
    this.resultadosService.getResultados(this.resultadosService.actualProcesoId)
      .subscribe(
        resultados => {
          this.resultados = resultados;
          if (resultados.length > 0) {
            this.getEvidencia(resultados[0].evidenciaId);
          }
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  getEvidencia(id: number) {
    this.spinner.show();
    if (this.resultados.length >= 1) {
      this.resultadosService.getEvidencia(id)
        .subscribe(res => {
          this.evidencia = res;
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
          }
        );
    }
  }

  seleccionarNodo($event) {
    this.spinner.show();
    this.resultadosService.setActualNodeId($event.node.id);
    this.resultadosService.getProcesoAncestros(this.resultadosService.actualProcesoId)
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

  // CONTENIDOS ASIGNATURA
  getSemanas(unidadId: number): any {
    this.spinner.show();
    this.contenidosAsignaturaService.getSemanasByUnidad(unidadId)
      .subscribe(
        semanas => {
          this.spinner.hide();
          return semanas;
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  contarTotalHorasIndividual(): any {
    const totales = { horasPracticas: 0, horasAutonomas: 0, horasDocente: 0 };
    this.semanas.forEach(
      semana => {
        totales.horasDocente += semana.horasActividadDocencia;
        totales.horasAutonomas += semana.horasTrabajoAutonomo;
        totales.horasPracticas += semana.horasTrabajoPractico;
      }
    );
    return totales;
  }

  getUnidades() {
    this.spinner.show();
    if (this.contenido) {
      this.contenidosAsignaturaService.getUnidadesByContenido(this.contenido.id)
        .subscribe(
          unidades => {
            this.unidades = unidades;
            this.spinner.hide();
          },
          err => {
            this.spinner.hide();
          }
        );
    }
  }

  contarHorasTotales(): number {
    let total = 0;
    this.semanas.forEach(
      semana => {
        total += semana.horasActividadDocencia;
        total += semana.horasTrabajoAutonomo;
        total += semana.horasTrabajoPractico;
      }
    );
    return total;
  }

  obtenerIndiceUnidad(unidad: Unidad) {
    return this.unidades.indexOf(unidad) + 1;
  }

  getContenidos() {
    this.spinner.show();
    this.contenidosAsignaturaService.getContenidoBySilabo(this.actualSilaboId)
      .subscribe(
        contenido => {
          console.log('llego contenido');
          console.log(contenido);
          if (contenido.length >= 1) {
            this.contenido = contenido[0];
            this.getUnidades();
          }
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  // ESTRATEGIAS RECURSOS
  getTiposMaterial(): void {
    this.spinner.show();
    this.recursosService.getTiposMaterial()
    .subscribe(
      tiposMaterial => {
        this.tiposMaterial = tiposMaterial;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      }
    );
  }

  verNombreTipoMaterial(id: number): any {
    const tipo = this.tiposMaterial.find(tipoMaterial => tipoMaterial.id === id);
    if (!tipo) {
      return false;
    }
    return tipo;
  }

  mostrarNombreTipoMaterial(tipoMaterial: TipoMaterial | number): string {
    return (tipoMaterial as TipoMaterial).nombre;
  }

  getMateriales(): void {
    this.spinner.show();
    this.recursosService.getMateriales(GlobalConstantsService.silaboActual)
      .subscribe(
        materiales => {
          this.materiales = materiales;
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  getEstrategias(): void {
    this.spinner.show();
    this.recursosService.getEstrategiasMetodologicas(GlobalConstantsService.silaboActual)
      .subscribe(
        estrategias => {
          this.estrategias = estrategias;
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }
}
