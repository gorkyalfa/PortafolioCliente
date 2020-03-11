import { Component, OnInit } from '@angular/core';
import {EstrategiasRecursosService } from "./estrategias-recursos.service"

@Component({
  selector: 'app-estrategias-recursos',
  templateUrl: './estrategias-recursos.component.html',
})
export class EstrategiasRecursosComponent implements OnInit {

  datos:any;
  constructor(private estrategiaservicio: EstrategiasRecursosService) { }

  ngOnInit(): void {
    this.getDatos();
  }
  getDatos():void {
    this.estrategiaservicio.getDatos().subscribe(datos => this.datos=datos);
    console.log(this.datos);
  }

}
