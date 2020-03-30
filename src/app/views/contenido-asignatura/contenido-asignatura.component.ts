import { Component, OnInit, ViewChild } from '@angular/core';
import { ContenidoAsignaturaService } from './contenido-asignatura.service';
import { Semana } from '../../entidades/semana';
import { Contenido } from '../../entidades/contenido';
import { Unidad } from '../../entidades/unidad';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contenido-asignatura',
  templateUrl: './contenido-asignatura.component.html'
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

  actualAsignaturaId: number = 1;
  semanas: Semana[];
  contenido: Contenido;
  unidades: Unidad[];

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private _servicio: ContenidoAsignaturaService) { }

  ngOnInit(): void {
    this.getContenidos();
    this.getUnidades();
  }

  // Metodos de semana
  getSemanas(unidadId: number) {
    this._servicio.getSemanasByUnidad(unidadId)
      .subscribe(semanas => {
        this.semanas = semanas;
        console.log(this.semanas);
      });
  }

  crearSemana(unidadID: number) {
    if (this.unidades) {
      this._servicio.createSemana({...this.semana, unidad: unidadID})
        .subscribe(semana => {
          console.log('semana creada');
          console.log(semana);
          this.getSemanas(unidadID);
        });
    }
  }

  // Metodos de unidad

  getUnidades() {
    if (this.contenido) {
      this._servicio.getUnidadesByContenido(this.contenido.id)
        .subscribe(unidades => {
          this.unidades = unidades;
          console.log(unidades);
        });
    }
  }

  createUnidad(unidad: Unidad) {
    if (this.contenido) {
      this._servicio.createUnidad({...unidad, contenido: this.contenido.id})
        .subscribe(
          res => {
            console.log('Unidad creada');
            console.log(res);
            this.getUnidades();
          },
          err => console.log(err)
        );
    }
  }

  obtenerIndiceUnidad(unidad: Unidad) {
    return this.unidades.indexOf(unidad) + 1;
  }

  // Metodos de contenido

  getContenidos() {
    this._servicio.getContenidoByAsignatura(this.actualAsignaturaId)
      .subscribe(contenido => {
        console.log('llego contenido');
        console.log(contenido);
        if (contenido.length >= 1 ) {

          this.contenido = contenido[0];
          this.getUnidades();

        }
        if (contenido.length < 1) {

          this.createContenido(this.contenidoCrear);

        }
      });
  }

  createContenido(contenido: Contenido) {
    this._servicio.createContenido({...contenido, asignaturaId: this.actualAsignaturaId})
      .subscribe(
        res => {
          console.log('contenido creado');
          console.log(res);
          this.getContenidos();
        },
        err => console.log(err)
      );
  }

}
