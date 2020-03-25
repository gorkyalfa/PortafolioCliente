import { Component, OnInit } from '@angular/core';
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';

@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent implements OnInit { 

  asignaturas: Asignatura[] = [];

  constructor(private silaboService: SilaboServiceService) { }

  ngOnInit() {
    this.getAsignaturas();
  }

  getAsignaturas(): void {
    this.silaboService.getAsignaturas()
      .subscribe(
       res => {
         this.asignaturas = res;
       },
       err => console.log(err)
       )
  }
}

                                 
                                                 