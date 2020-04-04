import { Component, OnInit } from '@angular/core';
import {EstrategiasRecursosService } from './estrategias-recursos.service';
import { TipoMaterial } from '../../entidades/tipoMaterial';
import { Material } from '../../entidades/material';
import { EstrategiaMetodologica } from '../../entidades/estrategiaMetodologica';
import { Finalidad } from '../../entidades/finalidad';

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

  constructor(private estrategiaservicio: EstrategiasRecursosService) { }

  ngOnInit(): void {
    this.getTiposMaterial();
    this.getMateriales();
    this.getFinalidades();
  }

  // Metodos de tipos materiales
  getTiposMaterial(): void {
    this.estrategiaservicio.getTiposMaterial()
    .subscribe(datos =>
      this.tiposMaterial = datos
      );
    console.log(this.tiposMaterial);
  }

  // Metodos de materiales
  crearMaterial(): void {
    console.log(this.material);
    this.estrategiaservicio.createMaterial(this.material)
      .subscribe(
        res => {
          console.log(res);
          this.getMateriales();
        },
        err => console.log(err)
      );
  }

  getMateriales(): void {
    this.estrategiaservicio.getMateriales()
      .subscribe(
        res => {
          this.materiales = res;
        }
      );
  }

  eliminarMaterial(id: number): void {
    this.estrategiaservicio.deleteMaterial(id)
      .subscribe(res => {
        this.getMateriales();
      });
  }

  eliminarMateriales() {
    this.idsMateriales.forEach(material => {
      if (material.value) {
        this.eliminarMaterial(material.id);
      }
    });
  }

  ingresarIdParaEliminar(id: number, value: boolean): void {
    this.idsMateriales = this.idsMateriales.filter(material => id !== material.id);
    this.idsMateriales.push({id, value});
    console.log(this.idsMateriales);
  }

  // Metodos de finalidades
  getFinalidades(): void {
    this.estrategiaservicio.getFinalidades()
      .subscribe(
        res => {
          this.finalidades = res;
          console.log(res);
        }
      );
  }

  crearFinalidad(): void {
    console.log(this.finalidad);
    this.estrategiaservicio.createFinalidad(this.finalidad)
      .subscribe(
        res => {
          console.log(res);
          this.getFinalidades();
        },
        err => console.log(err)
      );
  }

  crearEstrategia(): void {
    console.log(this.estrategiaMetodologica);
    this.estrategiaservicio.createEstrategiaMetodologica(this.estrategiaMetodologica)
      .subscribe(
        res => {
          console.log(res);
          this.finalidad.estrategiaMetodologicaId = res.id;
          this.crearFinalidad();
        },
        err => console.log(err)
      );
  }

  eliminarFinalidad(id: number, idEstrategia: number): void {
    this.estrategiaservicio.deleteFinalidad(id)
      .subscribe(res => {
        this.eliminarEstrategia(idEstrategia);
      });
  }

  eliminarEstrategia(id: number): void {
    this.estrategiaservicio.deleteEstrategiaMetodologica(id)
      .subscribe(res => {  
        this.getFinalidades();
      });
  }

  eliminarFinalidades() {
    this.datosFinalidades.forEach(finalidad => {
      if (finalidad.value) {
        this.eliminarFinalidad(finalidad.datos.id, finalidad.datos.estrategiaMetodologicaId);
      }
    });
  }

  ingresarFinalidadParaEliminar(datos: any, value: boolean): void {
    this.datosFinalidades = this.datosFinalidades.filter(finalidad => datos.id !== finalidad.datos.id);
    this.datosFinalidades.push({datos, value});
    console.log(this.datosFinalidades);
  }


}
