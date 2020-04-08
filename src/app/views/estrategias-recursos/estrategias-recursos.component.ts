import { Component, OnInit } from '@angular/core';
import {EstrategiasRecursosService } from './estrategias-recursos.service';
import { TipoMaterial } from '../../entidades/tipoMaterial';
import { Material } from '../../entidades/material';
import { EstrategiaMetodologica } from '../../entidades/estrategiaMetodologica';
import { Finalidad } from '../../entidades/finalidad';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-estrategias-recursos',
  templateUrl: './estrategias-recursos.component.html',
})
export class EstrategiasRecursosComponent implements OnInit {

  idsMateriales: any[] = [];
  datosFinalidades: any[] = [];

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

  constructor(private estrategiaservicio: EstrategiasRecursosService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTiposMaterial();
    this.getMateriales();
    this.getFinalidades();
  }

  // Metodos de tipos materiales
  getTiposMaterial(): void {
    // comenzamos en el inicio de cada funcion
    this.spinner.show(); // de esta manera mostramos el spinner
    this.estrategiaservicio.getTiposMaterial()
    .subscribe(datos => {// aqui en el subscribe esperamos antes del final
      this.tiposMaterial = datos;
      this.spinner.hide(); // ocultar spinner
    }); // final
    console.log(this.tiposMaterial);
  }

  // Metodos de materiales
  crearMaterial(): void {
    this.spinner.show();
    console.log(this.material);
    this.estrategiaservicio.createMaterial(this.material)
      .subscribe(
        res => {
          console.log(res);
          this.getMateriales();
          this.spinner.hide();
        },
        err => console.log(err)
      );
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

  eliminarMaterial(id: number): void {
    this.spinner.show();
    this.estrategiaservicio.deleteMaterial(id)
      .subscribe(res => {
        this.getMateriales();
        this.spinner.hide();
      });
  }

  eliminarMateriales() {
    this.spinner.show();
    this.idsMateriales.forEach(material => {
      if (material.value) {
        this.eliminarMaterial(material.id);
        this.spinner.hide();
      }
    });
  }

  ingresarIdParaEliminar(id: number, value: boolean): void {
    this.spinner.show();
    this.idsMateriales = this.idsMateriales.filter(material => id !== material.id);
    this.idsMateriales.push({id, value});
    console.log(this.idsMateriales);
    this.spinner.hide();
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
    console.log(this.finalidad);
    this.estrategiaservicio.createFinalidad(this.finalidad)
      .subscribe(
        res => {
          console.log(res);
          this.getFinalidades();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  crearEstrategia(): void {
    this.spinner.show();
    console.log(this.estrategiaMetodologica);
    this.estrategiaservicio.createEstrategiaMetodologica(this.estrategiaMetodologica)
      .subscribe(
        res => {
          console.log(res);
          this.finalidad.estrategiaMetodologicaId = res.id;
          this.crearFinalidad();
          this.spinner.hide();
        },
        err => console.log(err)
      );
  }

  eliminarFinalidad(id: number, idEstrategia: number): void {
    this.spinner.show();
    this.estrategiaservicio.deleteFinalidad(id)
      .subscribe(res => {
        this.eliminarEstrategia(idEstrategia);
        this.spinner.hide();
      });
  }

  eliminarEstrategia(id: number): void {
    this.spinner.show();
    this.estrategiaservicio.deleteEstrategiaMetodologica(id)
      .subscribe(res => {  
        this.getFinalidades();
        this.spinner.hide();
      });
  }

  eliminarFinalidades() {
    this.spinner.show();
    this.datosFinalidades.forEach(finalidad => {
      if (finalidad.value) {
        this.eliminarFinalidad(finalidad.datos.id, finalidad.datos.estrategiaMetodologicaId);
        this.spinner.hide();
      }
    });
  }

  ingresarFinalidadParaEliminar(datos: any, value: boolean): void {
    this.spinner.show(); 
    this.datosFinalidades = this.datosFinalidades.filter(finalidad => datos.id !== finalidad.datos.id);
    this.datosFinalidades.push({datos, value});
    this.spinner.hide();
    console.log(this.datosFinalidades);
  }


}
