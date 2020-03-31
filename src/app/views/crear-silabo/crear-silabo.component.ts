import { Component, OnInit } from '@angular/core';
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';
import { Silabo } from '../../entidades/silabo';


@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  correquisitos: Silabo[] = [];
  prerrequisitos: Silabo[] = [];
  // asignatura: Asignatura;

  constructor(private silaboService: SilaboServiceService) {}

  ngOnInit() {
    this.getAsignaturas();
    this.getSilaboCorrequisitos(2);
    this.getSilaboPrerrequisitos(2);
  }

  crear() {
    /*this.silabo = new Silabo();
    this.silabo.Asignatura = this.asignatura;
    this.silabo.Descripcion = this.asignatura.Descripcion;
    this.silabo.Objetivo = this.asignatura.Objetivo;
*/
    // Mas instrucciones incluir grabar a la base
  }

  getAsignaturas(): void {
    this.silaboService.getAsignaturas().subscribe(
      res => {
        this.asignaturas = res;
      },
      err => console.log(err)
    );
  }

  getSilaboCorrequisitos(id: number): void {
    this.silaboService.getSilaboCorrequisitos(id).subscribe(
      res => {
        this.correquisitos = res;
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
  }
}
