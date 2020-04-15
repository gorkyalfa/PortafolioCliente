import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EstrategiasRecursosService } from './estrategias-recursos.service';
import { TipoMaterial } from '../../entidades/tipoMaterial';
import { Material } from '../../entidades/material';
import { EstrategiaMetodologica } from '../../entidades/estrategiaMetodologica';
import { Finalidad } from '../../entidades/finalidad';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertConfig } from 'ngx-bootstrap/alert';

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
    descripcion: ''
  };
  finalidad: Finalidad = {
    nombre: ''
  };
  estrategiaMetodologica: EstrategiaMetodologica = {
    nombre: ''
  };

  materiales: Material[];
  tiposMaterial: TipoMaterial[];
  finalidades: Finalidad[];
  datosMateriales: any[] = [];
  datosFinalidades: any[] = [];
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
    this.getFinalidades();
  }

  mostrarNotif(mensaje: string, error: boolean): void {
    this.alertas.push({
      type: 'info',
      msg: `${mensaje}`,
      timeout: 5000,
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

  mostrarNombreTipoMaterial(tipoMaterial: TipoMaterial | number): string {
    return (tipoMaterial as TipoMaterial).nombre;
  }

  // Metodos de materiales
  crearMaterial(): void {
    this.spinner.show();
    this.estrategiaservicio.createMaterial(this.material)
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
    this.estrategiaservicio.getMateriales()
      .subscribe(
        materiales => {
          this.materiales = materiales;
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó!.', true);
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
  getFinalidades(): void {
    this.spinner.show();
    this.estrategiaservicio.getFinalidades()
      .subscribe(
        finalidades => {
          this.finalidades = finalidades;
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó!.', true);
        }
      );
  }

  crearFinalidad(): void {
    this.spinner.show();
    this.estrategiaservicio.createFinalidad(this.finalidad)
      .subscribe(
        res => {
          this.limpiarFinalidad();
          this.getFinalidades();
          this.spinner.hide();
          this.mostrarNotif('Finalidad creada exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

  eliminarFinalidad(finalidades: Finalidad[]): void {
    this.spinner.show();
    this.estrategiaservicio.deleteFinalidadesAndEstrategiaMetodologica(finalidades)
      .subscribe(
        res => {
          this.getFinalidades();
          this.datosFinalidades = [];
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  eliminarFinalidades(): void {
    const finalidadesParaEliminar = [];
    this.datosFinalidades.forEach(finalidad => {
      if (finalidad.value) {
        finalidadesParaEliminar.push(finalidad.datos);
      }
    });
    this.eliminarFinalidad(finalidadesParaEliminar);
  }

  ingresarFinalidadParaEliminar(datos: any, value: boolean): void {
    this.datosFinalidades = this.datosFinalidades
      .filter(finalidad => datos.id !== finalidad.datos.id);
    this.datosFinalidades.push({datos, value});
  }

  actualizarFinalidad(): void {
    this.spinner.show();
    this.estrategiaservicio.updateFinalidad(this.finalidad, this.finalidad.id)
      .subscribe(
        res => {
          this.editando = false;
          this.limpiarFinalidad();
          this.limpiarEstrategia();
          this.getFinalidades();
          this.spinner.hide();
          this.mostrarNotif('Actualizado exitoso.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al actualizar.', true);
        }
      );
  }

  limpiarFinalidad(): void {
    this.finalidad = {
      nombre: ''
    };
  }

  // Metodos de Estrategia Metodologica
  crearEstrategia(): void {
    this.spinner.show();
    this.estrategiaservicio.createEstrategiaMetodologica(this.estrategiaMetodologica)
      .subscribe(
        res => {
          this.finalidad.estrategiaMetodologicaId = res.id;
          this.limpiarEstrategia();
          this.crearFinalidad();
          this.spinner.hide();
          this.mostrarNotif('Estrategia creada exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

  actualizarEstrategia(): void {
    this.spinner.show();
    this.estrategiaservicio.updateEstrategiaMetodologica(this.estrategiaMetodologica, this.estrategiaMetodologica.id)
      .subscribe(
        res => {
          this.actualizarFinalidad();
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
    finalidad: Finalidad
  ) {
    this.estrategiaMetodologica = estrategia;
    this.finalidad = finalidad;
  }

  limpiarEstrategia(): void {
    this.estrategiaMetodologica = {
      nombre: ''
    };
  }

}
