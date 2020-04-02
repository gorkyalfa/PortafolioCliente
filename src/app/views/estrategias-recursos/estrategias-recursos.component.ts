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

  getTiposMaterial(): void {
    this.estrategiaservicio.getTiposMaterial()
    .subscribe(datos =>
      this.tiposMaterial = datos
      );
    console.log(this.tiposMaterial);
  }

  crearMaterial(): void {
    console.log(this.material);
    this.estrategiaservicio.createMaterial(this.material)
      .subscribe(
        res => {
          console.log(res);
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

}
