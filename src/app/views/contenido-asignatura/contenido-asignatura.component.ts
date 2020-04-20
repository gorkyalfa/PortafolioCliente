import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContenidoAsignaturaService } from './contenido-asignatura.service';
import { Semana } from '../../entidades/semana';
import { Contenido } from '../../entidades/contenido';
import { Unidad } from '../../entidades/unidad';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { GlobalConstants } from '../../common/global-constants';


export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-contenido-asignatura',
  templateUrl: './contenido-asignatura.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class ContenidoAsignaturaComponent implements OnInit {

  semana: Semana = {
    semanaNumero: 0,
    contenido: '',
    actividadDocencia: '',
    horasActividadDocencia: 0,
    trabajoPractico: '',
    horasTrabajoPractico: 0,
    trabajoAutonomo: '',
    horasTrabajoAutonomo: 0,
    observacion: ''
  };
  unidad: Unidad = {
    nombre: ''
  };
  contenidoCrear: Contenido = {
    nombre: 'PRUEBA'
  };
  actualSilaboId: number = GlobalConstants.silaboActual;

  semanas: Semana[];
  unidades: Unidad[];
  alertas: any = [];

  contenido: Contenido;
  editandoSemana = false;

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private _servicio: ContenidoAsignaturaService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getContenidos();
    this.getUnidades();
  }

  mostrarNotif(mensaje: string, error: boolean): void {
    this.alertas.push({
      type: 'info',
      msg: `${mensaje}`,
      timeout: 5000,
      error: error
    });
  }

  // Metodos de semana
  getSemanas(unidadId: number) {
    this.spinner.show();
    this._servicio.getSemanasByUnidad(unidadId)
      .subscribe(
        semanas => {
          this.semanas = semanas;
          this.actualizarUnidad(unidadId);
          this.spinner.hide();
          this.mostrarNotif('Carga exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('¡Algo pasó!.', true);
        }
      );
  }

  crearSemana(unidadID: number) {
    this.spinner.show();
    if (this.semanas && this.semanas.length > 1) {
      for (let i = 0; i < this.semanas.length; i++) {
        // tslint:disable-next-line: radix
        if (parseInt((this.semana.semanaNumero as string)) === this.semanas[i].semanaNumero) {
          this.spinner.hide();
          this.mostrarNotif('Número de semana repetido.', true);
          return;
        }
      }
      this.crearSemanaTrasValidar(unidadID);
      return;
    } else {
      this._servicio.getSemanasByUnidad(unidadID)
        .subscribe(
          res => {
            this.semanas = res;
            for (let i = 0; i < this.semanas.length; i++) {
              if (this.semana.semanaNumero === this.semanas[i].semanaNumero) {
                this.spinner.hide();
                this.mostrarNotif('Número de semana repetido.', true);
                return;
              }
            }
            this.crearSemanaTrasValidar(unidadID);
            this.mostrarNotif('Carga exitosa.', false);
            return;
          },
          err => {
            this.spinner.hide();
            this.mostrarNotif('¡Algo pasó!.', true);
          }
        );
    }
  }

  crearSemanaTrasValidar(unidadID: number) {
    if (this.unidades) {
      this._servicio.createSemana({ ...this.semana, unidad: unidadID })
        .subscribe(
          semana => {
            this.setSemanaLimpio();
            this.getSemanas(unidadID);
            this.spinner.hide();
            this.mostrarNotif('Semana creada exitosamente.', false);
          },
          err => {
            this.spinner.hide();
            this.mostrarNotif('Hubo un problema en la creación.', true);
          }
        );
    }
  }

  eliminarSemana(semanaId: number, unidadId: number) {
    this.spinner.show();
    this._servicio.deleteSemana(semanaId)
      .subscribe(
        semana => {
          this.getSemanas(unidadId);
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
  }

  setSemanaLimpio() {
    this.semana = {
      semanaNumero: 0,
      contenido: '',
      actividadDocencia: '',
      horasActividadDocencia: 0,
      trabajoPractico: '',
      horasTrabajoPractico: 0,
      trabajoAutonomo: '',
      horasTrabajoAutonomo: 0,
      observacion: ''
    };
  }

  setSemana(semana: Semana) {
    this.semana = semana;
  }

  actualizarSemana() {
    this.spinner.show();
    this._servicio.updateSemana(this.semana, this.semana.id)
      .subscribe(
        res => {
          this.setSemanaLimpio();
          this.editandoSemana = false;
          this.spinner.hide();
          this.mostrarNotif('Actualizado exitoso.', true);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al actualizar.', true);
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

  // Metodos de unidad

  getUnidades() {
    this.spinner.show();
    if (this.contenido) {
      this._servicio.getUnidadesByContenido(this.contenido.id)
        .subscribe(
          unidades => {
            this.unidades = unidades;
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

  createUnidad(unidad: Unidad) {
    this.spinner.show();
    if (this.contenido) {
      this._servicio.createUnidad({ ...unidad, contenido: this.contenido.id })
        .subscribe(
          res => {
            this.unidad = {
              nombre: ''
            };
            this.getUnidades();
            this.spinner.hide();
            this.mostrarNotif('Unidad creada exitosamente.', false);
          },
          err => {
            this.spinner.hide();
            this.mostrarNotif('Hubo un problema en la creación.', true);
          }
        );
    }
  }

  actualizarUnidad(id: number) {
    this.spinner.show();
    const horas = this.contarHorasTotales();
    this._servicio.updateUnidad({ horasTotales: horas }, id)
      .subscribe(
        res => {
          this.spinner.hide();
        }
      );
  }

  eliminarUnidad(id: number) {
    this.spinner.show();
    this._servicio.deleteUnidad(id)
      .subscribe(
        res => {
          this.getUnidades();
          this.spinner.hide();
          this.mostrarNotif('Eliminación exitosa.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema al eliminar.', true);
        }
      );
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

  // Metodos de contenido

  getContenidos() {
    this.spinner.show();
    this._servicio.getContenidoBySilabo(this.actualSilaboId)
      .subscribe(
        contenido => {
          console.log('llego contenido');
          console.log(contenido);
          if (contenido.length >= 1) {
            this.contenido = contenido[0];
            this.getUnidades();
          }
          if (contenido.length < 1) {
            this.createContenido(this.contenidoCrear);
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

  createContenido(contenido: Contenido) {
    this.spinner.show();
    this._servicio.createContenido(
      { ...contenido, silabo: this.actualSilaboId }
    )
      .subscribe(
        res => {
          console.log('contenido creado');
          console.log(res);
          this.getContenidos();
          this.spinner.hide();
          this.mostrarNotif('Contenido creado exitosamente.', false);
        },
        err => {
          this.spinner.hide();
          this.mostrarNotif('Hubo un problema en la creación.', true);
        }
      );
  }

}
