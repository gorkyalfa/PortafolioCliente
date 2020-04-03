import { Component, OnInit } from '@angular/core';
import { DescripcionObjetivosService } from './descripcion-objetivos.service';
import { Descripcion } from '../../entidades/descripcion';

@Component({
  selector: 'app-descripcion-objetivos',
  templateUrl: './descripcion-objetivos.component.html'
})
export class DescripcionObjetivosComponent implements OnInit {

  descripcion: Descripcion;
  descripcionSilabo: Descripcion;
  descripciones: Descripcion[];

  constructor(private descripcionObjetivosService: DescripcionObjetivosService) { }

  ngOnInit() {
    this.getDescripcionSilabo(2);
    this.getDescripcion(2);
    this.getDescripciones();
    
  }

  getDescripcion(id: number): void {
    this.descripcionObjetivosService.getDescripcion(id)
      .subscribe(descripcion => this.descripcion = descripcion);
  }

  getDescripcionSilabo(id: number): void {
    this.descripcionObjetivosService.getSilabo(id)
      .subscribe(descripcionSilabo => this.descripcionSilabo = descripcionSilabo);
  }

  getDescripciones(): void {
    this.descripcionObjetivosService.getDescripciones()
      .subscribe(
        res => {
          this.descripciones = res;
        }
      );
  }


  crearMaterial(): void {
    console.log(this.descripcion);
    this.descripcionObjetivosService.createDescripcion(this.descripcion)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      );
  }

  textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25 + o.scrollHeight) + "px";
  }
}






