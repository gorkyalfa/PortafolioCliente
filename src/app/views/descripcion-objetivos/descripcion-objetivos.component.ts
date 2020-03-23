import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DescripcionObjetivosService } from './descripcion-objetivos.service';
import { Asignatura } from '../../entidades/asignatura';

@Component({
  selector: 'app-descripcion-objetivos',
  templateUrl: './descripcion-objetivos.component.html'
})
export class DescripcionObjetivosComponent implements OnInit {

  asignatura: Asignatura;

  constructor(private formBuilder: FormBuilder, private descripcionObjetivosService: DescripcionObjetivosService) { }

  ngOnInit() {
    this.getAsignatura(4);
  }

  getAsignatura(id: number): void {
    this.descripcionObjetivosService.getAsignatura(id)
      .subscribe(asignatura => this.asignatura = asignatura);
  }

  textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25 + o.scrollHeight) + "px";
  }
}
