import { Component, OnInit } from '@angular/core';
import { ResultadoAprendizajePerfilCarreraService } from './resultado-aprendizaje-perfil-carrera.service';

@Component({
  selector: 'app-resultado-aprendizaje-perfil-carrera',
  templateUrl: './resultado-aprendizaje-perfil-carrera.component.html',
})
export class ResultadoAprendizajePerfilCarreraComponent implements OnInit {

  constructor(private service: ResultadoAprendizajePerfilCarreraService) { }

  ngOnInit(): void {
  }

  getResultados() {

  }

  contarIndices() {

  }

}
