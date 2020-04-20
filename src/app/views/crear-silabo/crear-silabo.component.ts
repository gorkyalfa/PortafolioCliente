import { Component, OnInit } from '@angular/core';
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';
import { Silabo } from '../../entidades/silabo';


@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent implements OnInit {
  idSeleccionado: number;
  descripcion: Silabo;
  silabos: Silabo[] = [];
  asignaturas: Asignatura[] = [];
  correquisito: Asignatura;
  prerequisito: Asignatura;
  asignatura: Asignatura;

  constructor(private silaboService: SilaboServiceService) {}

  ngOnInit() {
    this.getAsignaturas();
    // this.getAsignatura(this.idSeleccionado);
    //this.getCorrequisitos(this.idSeleccionado);
    //this.getSilaboDescripcionObjetivo(this.idSeleccionado);    
    //this.getSilaboPrerrequisitos(this.idSeleccionado);
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
      .subscribe(asignatura => {
        this.asignatura = asignatura;
        this.getCorrequisitos(id);
        this.getPrerequisitos(id);
      });
  }

  getCorrequisitos(id: number): void {
    this.silaboService.getCorrequisitos(id).subscribe(
      res => {
        console.log(res.correquisito);
        this.correquisito = res.correquisito;
      },
      err => console.log(err)
    );
  }

  getPrerequisitos(id: number): void {
    this.silaboService.getPrerequisitos(id).subscribe(
      res => {
        console.log(res.prerequisito);
        this.prerequisito = res.prerequisito;
      },
      err => console.log(err)
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
