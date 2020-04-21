import { Component, OnInit } from '@angular/core';
import { DescripcionObjetivosService } from './descripcion-objetivos.service';
import { Descripcion } from '../../entidades/descripcion';
import { NgxSpinnerService } from 'ngx-spinner';
import { Silabo } from '../../entidades/silabo';
import { CrearSilaboComponent } from '../crear-silabo/crear-silabo.component';
import { GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-descripcion-objetivos',
  templateUrl: './descripcion-objetivos.component.html'
})
export class DescripcionObjetivosComponent implements OnInit {

  silabo: Silabo;
  crearSilaboComponente: CrearSilaboComponent;
  descripcion: Descripcion;
  descripcionSilabo: Descripcion;
  descripciones: Descripcion[];
  editandoDescripcion = false;
  alertas: any = [];

  constructor(private descripcionObjetivosService: DescripcionObjetivosService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getDescripcionSilabo(GlobalConstants.silaboActual);
    // this.getDescripciones();
    console.log(GlobalConstants.silaboActual);
  }

  getDescripcion(id: number): void {
    this.descripcionObjetivosService.getDescripcion(id)
      .subscribe(descripcion => this.descripcion = descripcion);
  }

  getDescripcionSilabo(id: number): void {
    this.descripcionObjetivosService.getSilabo(id)
      .subscribe(descripcionSilabo => this.silabo = descripcionSilabo);
  }

  getDescripciones(): void {
   this.descripcionObjetivosService.getDescripciones()
      .subscribe(
        res => {
          this.descripciones = res;
        }
      );
  }

  crearDescripcion(): void {
    this.spinner.show();
    this.descripcionObjetivosService.createDescripcion(this.descripcion)
      .subscribe(
        res => {
          this.limpiarDescripcion();
          this.getDescripciones();
          this.spinner.hide();
          this.mostrarNotif();
        },
        err => console.log(err)
      );
  }

  limpiarDescripcion(): void {
    this.descripcion = {
      descripcion: '',
      objetivo: ''
    };
  }

  actualizarDescpripcionSilabo() {
    console.log(this.silabo);
    this.descripcionObjetivosService.updateDescripcionSilabo(this.silabo, GlobalConstants.silaboActual)
      .subscribe(res => {
        console.log(res);
      });
  }

  mostrarNotif(): void {
    this.alertas.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  mostrarConsoleLog() {
    console.log('prueba');
  }
}






