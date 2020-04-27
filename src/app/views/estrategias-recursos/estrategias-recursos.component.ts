import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EstrategiasRecursosService } from './estrategias-recursos.service';
import { TipoMaterial } from '../../entidades/tipoMaterial';
import { Material } from '../../entidades/material';
import { EstrategiaMetodologica } from '../../entidades/estrategiaMetodologica';
import { Finalidad } from '../../entidades/finalidad';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { GlobalConstants } from '../../common/global-constants';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-estrategias-recursos',
  templateUrl: './estrategias-recursos.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class EstrategiasRecursosComponent implements OnInit {

  material: Material = {
    nombre: '',
    descripcion: '',
    silabo: GlobalConstants.silaboActual
  };

  estrategiaMetodologica: EstrategiaMetodologica = {
    nombre: '',
    finalidad: '',
    silabo: GlobalConstants.silaboActual
  };

  materiales: Material[];
  tiposMaterial: TipoMaterial[];
  estrategias: EstrategiaMetodologica[];
  datosMateriales: any[] = [];
  datosEstrategias: any[] = [];
  alertas: any = [];

  editando: boolean = false;
  editandoMaterial: boolean = false;

  constructor(
    private estrategiaservicio: EstrategiasRecursosService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getTiposMaterial();
    this.getMateriales();
    this.getEstrategias();
  }

  mostrarNotif(mensaje: string, error: boolean): void {
    this.alertas.push({
      type: 'info',
      msg: `${mensaje}`,
      timeout: 1500,
      error: error
    });
  }

  // Metodos de tipos materiales
  getTiposMaterial(): void {
    this.spinner.show();
    this.estrategiaservicio.getTiposMaterial()
    .subscribe(
      tiposMaterial => {
        this.tiposMaterial = tiposMaterial;
        this.material.tipoMaterial = this.tiposMaterial[0];
        this.spinner.hide();
        this.mostrarNotif('Carga exitosa.', false);
      },
      err => {
        this.spinner.hide();
        this.mostrarNotif('¡Algo pasó!.', true);
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

  // Metodos de materiales
  crearMaterial(): void {
    this.spinner.show();
    this.estrategiaservicio.createMaterial({...this.material, silabo: GlobalConstants.silaboActual})
      .subscribe(
        res => {
          this.limpiarMaterial();
          this.getMateriales();
          this.spinner.hide();
          this.mostrarNotif('Material creado exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

  limpiarMaterial(): void {
    this.material = {
      nombre: '',
      descripcion: '',
      tipoMaterial: this.tiposMaterial[0]
    };
  }

  setMaterial(material: Material): void {
    this.material = material;
  }

  getMateriales(): void {
    this.spinner.show();
    this.estrategiaservicio.getMateriales(GlobalConstants.silaboActual)
      .subscribe(
        materiales => {
          this.materiales = materiales;
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó! Quizá no posee un sílabo en proceso.', true);
        }
      );
  }

  eliminarMaterial(materiales: Material[]): void {
    this.spinner.show();
    this.estrategiaservicio.deleteMateriales(materiales)
      .subscribe(
        res => {
          this.getMateriales();
          this.datosMateriales = [];
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  eliminarMateriales(): void {
    const materialesEliminar = [];
    this.datosMateriales.forEach(material => {
      if (material.value) {
        materialesEliminar.push(material.material);
      }
    });
    this.eliminarMaterial(materialesEliminar);
  }

  ingresarMaterialParaEliminar(material: Material, value: boolean): void {
    this.datosMateriales = this.datosMateriales
      .filter(materiales => materiales.id !== material.id);
    this.datosMateriales.push({material, value});
  }

  actualizarMaterial(): void {
    this.spinner.show();
    this.estrategiaservicio.updateMaterial(this.material, this.material.id)
      .subscribe(
        res => {
          this.editandoMaterial = false;
          this.limpiarMaterial();
          this.getMateriales();
          this.spinner.hide();
          this.mostrarNotif('Actualizado exitoso.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al actualizar.', true);
        }
      );
  }

  // Metodos de finalidades
  // getFinalidades(): void {
  //   this.spinner.show();
  //   this.estrategiaservicio.getFinalidades()
  //     .subscribe(
  //       finalidades => {
  //         this.finalidades = finalidades;
  //         this.spinner.hide();
  //         this.mostrarNotif('Carga exitosa.', false);
  //       },
  //       err => {
  //         this.spinner.hide();
  //         this.mostrarNotif('¡Algo pasó!.', true);
  //       }
  //     );
  // }

  // crearFinalidad(): void {
  //   this.spinner.show();
  //   this.estrategiaservicio.createFinalidad({...this.finalidad, silabo: GlobalConstants.silaboActual})
  //     .subscribe(
  //       res => {
  //         this.limpiarFinalidad();
  //         this.getFinalidades();
  //         this.spinner.hide();
  //         this.mostrarNotif('Finalidad creada exitosamente.', false);
  //       },
  //       err => {
  //         this.spinner.hide();
  //         this.mostrarNotif('Hubo un problema en la creación.', true);
  //       }
  //     );
  // }

  eliminarEstrategia(estrategias: EstrategiaMetodologica[]): void {
    this.spinner.show();
    this.estrategiaservicio.deleteEstrategiasMetodologicas(estrategias)
      .subscribe(
        res => {
          this.getEstrategias();
          this.datosEstrategias = [];
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  eliminarEstrategias(): void {
    const estrategiasParaEliminar = [];
    this.datosEstrategias.forEach(finalidad => {
      if (finalidad.value) {
        estrategiasParaEliminar.push(finalidad.datos);
      }
    });
    this.eliminarEstrategia(estrategiasParaEliminar);
  }

  ingresarEstrategiaParaEliminar(datos: any, value: boolean): void {
    this.datosEstrategias = this.datosEstrategias
      .filter(estrategia => datos.id !== estrategia.datos.id);
    this.datosEstrategias.push({datos, value});
  }

  // actualizarFinalidad(): void {
  //   this.spinner.show();
  //   this.estrategiaservicio.updateFinalidad(this.finalidad, this.finalidad.id)
  //     .subscribe(
  //       res => {
  //         this.editando = false;
  //         this.limpiarFinalidad();
  //         this.limpiarEstrategia();
  //         this.getFinalidades();
  //         this.spinner.hide();
  //         this.mostrarNotif('Actualizado exitoso.', false);
  //       },
  //       err => {
  //         this.spinner.hide();
  //         this.mostrarNotif('Hubo un problema al actualizar.', true);
  //       }
  //     );
  // }

  // limpiarFinalidad(): void {
  //   this.finalidad = {
  //     nombre: ''
  //   };
  // }

  // Metodos de Estrategia Metodologica
  crearEstrategia(): void {
    this.spinner.show();
    this.estrategiaservicio.createEstrategiaMetodologica(this.estrategiaMetodologica)
      .subscribe(
        res => {
          this.limpiarEstrategia();
          this.getEstrategias();
          this.spinner.hide();
          this.mostrarNotif('Estrategia creada exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

  getEstrategias(): void {
    this.spinner.show();
    this.estrategiaservicio.getEstrategiasMetodologicas(GlobalConstants.silaboActual)
      .subscribe(
        estrategias => {
          this.estrategias = estrategias;
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó! Quizá no posee un sílabo en proceso.', true);
        }
      );
  }

  actualizarEstrategia(): void {
    this.spinner.show();
    this.estrategiaservicio.updateEstrategiaMetodologica(this.estrategiaMetodologica, this.estrategiaMetodologica.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.mostrarNotif('Estrategia actualizada exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al actualizar.', true);
        }
      );
  }

  setEstrategiayFinalidad(
    estrategia: EstrategiaMetodologica,
  ) {
    this.estrategiaMetodologica = estrategia;
  }

  limpiarEstrategia(): void {
    this.estrategiaMetodologica = {
      nombre: '',
      finalidad: '',
      silabo: GlobalConstants.silaboActual
    };
  }

}
