import { Component, OnInit } from '@angular/core';
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';
import { Silabo } from '../../entidades/silabo';


@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent implements OnInit {
  silabo: Silabo;
  idSeleccionado: number;
  descripcion: Silabo;
  silabos: Silabo[] = [];
  asignaturas: Asignatura[] = [];
  correquisitos: Asignatura[] = [];
  prerrequisitos: Silabo[] = [];
  asignatura: Asignatura;

  constructor(private silaboService: SilaboServiceService) {}

  ngOnInit() {
    this.getSilabos();
    this.getAsignaturas();
    this.getAsignatura(this.idSeleccionado);
    //this.getCorrequisitos(this.idSeleccionado);
    //this.getSilaboDescripcionObjetivo(this.idSeleccionado);    
    //this.getSilaboPrerrequisitos(this.idSeleccionado);
  }

  getSilabos(): void {
    this.silaboService.getSilabos().subscribe(
      res => {
        this.silabos = res;
      },
      err => console.log(err)
    );
  }

  getAsignaturas(): void {
    this.silaboService.getAsignaturas().subscribe(
      res => {
        this.asignaturas = res;
      },
      err => console.log(err)
    );
  }

  getAsignatura(id: number): void {
    this.silaboService.getAsignatura(id)
      .subscribe(asignatura => this.asignatura = asignatura);
  }

  getCorrequisitos(id: number): void {
    this.silaboService.getCorrequisitos(id).subscribe(
      res => {
        this.correquisitos = res;
      },
      err => console.log(err)
    );
  }
  

  crearSilabo(): void {

    this.silabo = new Silabo();
    this.silabo.nombre = this.asignatura.nombre;
    this.silabo.asignaturaId = this.asignatura.id;
    this.silabo.codigo = this.asignatura.codigo;
    this.silabo.periodoLectivo = this.asignatura.periodoLectivo;
    this.silabo.unidadOrganizacionCurricular = this.asignatura.unidadOrganizacionCurricular;
    this.silabo.campoFormacion = this.asignatura.campoFormacion;
    this.silabo.totalHorasAutonomas = this.asignatura.totalHorasAutonomas;
    this.silabo.totalHorasDocencia = this.asignatura.totalHorasDocencia;
    this.silabo.totalHorasPracticasAprendizaje = this.asignatura.totalHorasPracticasAprendizaje;
    this.silabo.numeroTotalHoras = this.asignatura.numeroTotalHoras;
    
    this.silaboService.createSilabo(this.silabo)
      .subscribe(
        res => {
          window.location.href = 'http://localhost:4200/#/descripcion-objetivos'
        },
        err => console.log(this.silabo)
      );
  }

  onSelect(asignatura: Asignatura): void {
    this.idSeleccionado = asignatura.id;
    this.getAsignatura(this.idSeleccionado);
    this.getCorrequisitos(this.idSeleccionado);
  }

  /*getSilaboDescripcionObjetivo(id: number): void {
    this.silaboService.getDescripcionObjetibo(id)
      .subscribe(descripcion => this.descripcion = descripcion);
  }

  

  crear() {
    /*this.silabo = new Silabo();
    this.silabo.Asignatura = this.asignatura;
    this.silabo.Descripcion = this.asignatura.Descripcion;
    this.silabo.Objetivo = this.asignatura.Objetivo;

    // Mas instrucciones incluir grabar a la base
  }
 

  getSilaboAsignaturas(): void {
    this.silaboService.getSilaboAsignaturas().subscribe(
      res => {
        this.silabos = res;
      },
      err => console.log(err)
    );
  }

  getSilaboPrerrequisitos(id: number): void {
    this.silaboService.getSilaboPrerrequisitos(id).subscribe(
      res => {
        this.prerrequisitos = res;
      },
      err => console.log(err)
    );
  }*/
}
