import { Component, OnInit } from '@angular/core';
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';

@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  // silabo: Silabo;
  // asignatura: Asignatura;

  constructor(private silaboService: SilaboServiceService) {}

  ngOnInit() {
    this.getAsignaturas();
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
}
