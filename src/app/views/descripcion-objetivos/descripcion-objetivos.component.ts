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

  constructor(private formBuilder: FormBuilder, private descripcionObjetivosService: DescripcionObjetivosService) {}
    
   asignaturasForm = this.formBuilder.group({
    asignaturas: ['']
  }) 
  
  
  ngOnInit() {
    this.getAsignatura(1);
  }

  getAsignatura (id:number): void {
    this.descripcionObjetivosService.getAsignatura(id)
        .subscribe(asignatura => this.asignatura = asignatura);
  }
  
    submit() {
      alert(JSON.stringify(this.asignaturasForm.value))
    }
  }
