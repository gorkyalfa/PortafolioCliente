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
  asignaturas: Silabo[] = [];
  correquisitos: Silabo[] = [];
  prerrequisitos: Silabo[] = [];
  // asignatura: Asignatura;

  constructor(private silaboService: SilaboServiceService) {}

  ngOnInit() {
    this.getSilaboAsignaturas();
    this.getSilaboDescripcionObjetivo(this.idSeleccionado);
    this.getSilaboCorrequisitos(this.idSeleccionado);
    this.getSilaboPrerrequisitos(this.idSeleccionado);
  }

  getSilaboDescripcionObjetivo(id: number): void {
    this.silaboService.getDescripcionObjetibo(id)
      .subscribe(descripcion => this.descripcion = descripcion);
  }

  onSelect(silabo: Silabo): void {
    this.idSeleccionado = silabo.id;
    this.getSilaboCorrequisitos(this.idSeleccionado);
    this.getSilaboPrerrequisitos(this.idSeleccionado);
  }

  crear() {
    /*this.silabo = new Silabo();
    this.silabo.Asignatura = this.asignatura;
    this.silabo.Descripcion = this.asignatura.Descripcion;
    this.silabo.Objetivo = this.asignatura.Objetivo;
*/
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
