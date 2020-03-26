import { Component, OnInit } from '@angular/core';
import { ContenidoAsignaturaService } from './contenido-asignatura.service';
import { Semana } from '../../entidades/semana';
import { Contenido } from '../../entidades/contenido';
import { Unidad } from '../../entidades/unidad';

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

  semanas: Semana[];
  contenidos: Contenido[];
  unidades: Unidad[];

  constructor(private _servicio: ContenidoAsignaturaService) { }

  ngOnInit(): void {
    this.getContenidos();
    this.getUnidades();
    this.getSemanas();
  }

  // Metodos de semana
  getSemanas() {
    this._servicio.getSemanas()
      .subscribe(semanas => {
        this.semanas = semanas;
        console.log(this.semanas);
      });
  }

  crearSemana() {
    if (this.unidades && this.unidades[0]) {
      this._servicio.createSemana({...this.semana, unidad: this.unidades[0].id})
        .subscribe(semana => {
          console.log(semana);
        });
    } else {
      this.createUnidad({nombre: 'Prueba'});
      this._servicio.createSemana({...this.semana, unidad: this.unidades[0].id})
        .subscribe(semana => {
          console.log(semana);
        });
    }
  }

  // Metodos de unidad

  getUnidades() {
    this._servicio.getUnidades()
      .subscribe(unidades => {
        this.unidades = unidades;
        console.log(unidades);
      });
  }

  createUnidad(unidad: Unidad) {
    if (this.contenidos && this.contenidos[0]) {
      this._servicio.createUnidad(unidad)
        .subscribe(
          res => {
            console.log('Unidad creada');
            console.log(res);
            this.getUnidades();
          },
          err => console.log(err)
        );
    } else {
      this.createContenido({nombre: ''});
      this._servicio.createUnidad({...unidad, contenido: this.contenidos[0].id})
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

  // Metodos de contenido

  getContenidos() {
    this._servicio.getContenidos()
      .subscribe(contenidos => {
        console.log(contenidos);
        this.contenidos = contenidos;
      });
  }

  createContenido(contenido: Contenido) {
    this._servicio.createContenido(contenido)
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
