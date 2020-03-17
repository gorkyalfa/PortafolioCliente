import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';

@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent implements OnInit {
  

  constructor(private formBuilder: FormBuilder, private silaboService: SilaboServiceService) { }

  
  ngOnInit() {
    this.getAsignaturas();
  }

  getAsignaturas(): void {
    this.silaboService.getAsignaturas()
      .subscribe(
       res => console.log(res),
       err => console.log(err)
       )
  }
}


