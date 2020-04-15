import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {EstrategiasRecursosService } from './estrategias-recursos.service';
import { TipoMaterial } from '../../entidades/tipoMaterial';
import { Material } from '../../entidades/material';
import { EstrategiaMetodologica } from '../../entidades/estrategiaMetodologica';
import { Finalidad } from '../../entidades/finalidad';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertConfig } from 'ngx-bootstrap/alert';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-estrategias-recursos',
  templateUrl: './estrategias-recursos.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class EstrategiasRecursosComponent implements OnInit {

  datosMateriales: any[] = [];
  datosFinalidades: any[] = [];
  editando = false;
  editandoMaterial = false;

  material: Material = {
    nombre: '',
    descripcion: ''
  };
  finalidad: Finalidad = {
    nombre: ''
  };
  estrategiaMetodologica: EstrategiaMetodologica = {
    nombre: ''
  };
  materiales: Material[];
  tiposMaterial: TipoMaterial[];
  finalidades: Finalidad[];

  alertas: any = [];

  constructor(private estrategiaservicio: EstrategiasRecursosService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTiposMaterial();
    this.getMateriales();
    this.getFinalidades();
  }

  mostrarNotif(): void {
    this.alertas.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  // Metodos de tipos materiales
  getTiposMaterial(): void {
    // comenzamos en el inicio de cada funcion
    this.spinner.show(); // de esta manera mostramos el spinner
    this.estrategiaservicio.getTiposMaterial()
    .subscribe(datos => {// aqui en el subscribe esperamos antes del final
      this.tiposMaterial = datos;
      this.material.tipoMaterial = this.tiposMaterial[0];
      this.spinner.hide(); // ocultar spinner
    }); // final
    console.log(this.tiposMaterial);
  }

  mostrarNombreTipoMaterial(tipoMaterial: TipoMaterial | number) {
    return (tipoMaterial as TipoMaterial).nombre;
  }

  // Metodos de materiales
  crearMaterial(): void {
    this.spinner.show();
    this.estrategiaservicio.createMaterial(this.material)
      .subscribe(
        res => {
          this.limpiarMaterial();
          this.getMateriales();
          this.spinner.hide();
          this.mostrarNotif();
        },
        err => console.log(err)
      );
  }

  limpiarMaterial(): void {
    this.material = {
      nombre: '',
      descripcion: '',
      tipoMaterial: this.tiposMaterial[0]
    };
  }

  setMaterial(material: Material) {
    this.material = material;
  }

  getMateriales(): void {
    this.spinner.show();
    this.estrategiaservicio.getMateriales()
      .subscribe(
        res => {
          this.materiales = res;
          this.spinner.hide();
        }
      );
  }

  eliminarMaterial(materiales: Material[]): void {
    this.spinner.show();
    this.estrategiaservicio.deleteMateriales(materiales)
      .subscribe(res => {
        this.getMateriales();
        this.datosMateriales = [];
        this.spinner.hide();
      });
  }

  eliminarMateriales() {
    const materialesEliminar = [];
    this.datosMateriales.forEach(material => {
      if (material.value) {
        materialesEliminar.push(material.material);
      }
    });
    this.eliminarMaterial(materialesEliminar);
  }

  ingresarMaterialParaEliminar(material: Material, value: boolean): void {
    this.datosMateriales = this.datosMateriales.filter(materiales => materiales.id !== material.id);
    this.datosMateriales.push({material, value});
    console.log(this.datosMateriales);
  }

  actualizarMaterial() {
    this.spinner.show();
    this.estrategiaservicio.updateMaterial(this.material, this.material.id)
      .subscribe(res => {
        this.editandoMaterial = false;
        this.limpiarMaterial();
        this.getMateriales();
        this.spinner.hide();
      });
  }

  // Metodos de finalidades
  getFinalidades(): void {
    this.spinner.show();
    this.estrategiaservicio.getFinalidades()
      .subscribe(
        res => {
          this.finalidades = res;
          this.spinner.hide();
          console.log(res);
        }
      );
  }

  crearFinalidad(): void {
    this.spinner.show();
    this.estrategiaservicio.createFinalidad(this.finalidad)
      .subscribe(
        res => {
          this.finalidad = {
            nombre: ''
          };
          this.getFinalidades();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  eliminarFinalidad(finalidades: Finalidad[]): void {
    this.spinner.show();
    console.log(finalidades);
    this.estrategiaservicio.deleteFinalidadesAndEstrategiaMetodologica(finalidades)
      .subscribe(res => {
        this.getFinalidades();
        this.datosFinalidades = [];
        this.spinner.hide();
      });
  }

  eliminarFinalidades() {
    const finalidadesParaEliminar = [];
    this.datosFinalidades.forEach(finalidad => {
      if (finalidad.value) {
        finalidadesParaEliminar.push(finalidad.datos);
      }
    });
    this.eliminarFinalidad(finalidadesParaEliminar);
  }

  ingresarFinalidadParaEliminar(datos: any, value: boolean): void {
    this.datosFinalidades = this.datosFinalidades.filter(finalidad => datos.id !== finalidad.datos.id);
    this.datosFinalidades.push({datos, value});
  }

  actualizarFinalidad(): void {
    this.spinner.show();
    this.estrategiaservicio.updateFinalidad(this.finalidad, this.finalidad.id)
      .subscribe(res => {
        this.editando = false;
        this.finalidad = {
          nombre: ''
        };
        this.estrategiaMetodologica = {
          nombre: ''
        };
        this.getFinalidades();
        this.spinner.hide();
      });
  }

  // Metodos de Estrategia Metodologica
  crearEstrategia(): void {
    this.spinner.show();
    this.estrategiaservicio.createEstrategiaMetodologica(this.estrategiaMetodologica)
      .subscribe(
        res => {
          this.finalidad.estrategiaMetodologicaId = res.id;
          this.estrategiaMetodologica = {
            nombre: ''
          };
          this.crearFinalidad();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  actualizarEstrategia(): void {
    this.spinner.show();
    this.estrategiaservicio.updateEstrategiaMetodologica(this.estrategiaMetodologica, this.estrategiaMetodologica.id)
      .subscribe(res => {
        console.log(res);
        this.actualizarFinalidad();
        this.spinner.hide();
      });
  }

  setEstrategiayFinalidad(estrategia: EstrategiaMetodologica, finalidad: Finalidad) {
    this.estrategiaMetodologica = estrategia;
    this.finalidad = finalidad;
  }

}
