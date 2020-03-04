import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SilaboServiceService } from './silabo-service.service';
import { Asignatura } from '../../entidades/asignatura';

@Component({
  selector: 'app-crear-silabo',
  templateUrl: 'crear-silabo.component.html'
})
export class CrearSilaboComponent {
  asignaturas: Asignatura[];

  correquisitosAsignatura: Asignatura[]

  prerrequisitosAsignatura: Asignatura[]

  allAsignatura: Asignatura[]

  constructor(private formBuilder: FormBuilder, private silaboService: SilaboServiceService) {}
    
  asignaturasForm = this.formBuilder.group({
    asignaturas: ['']
  }) 

  correquisitosForm = this.formBuilder.group({
    correquisitosAsignatura: ['']
  })

  prerrequisitosForm = this.formBuilder.group({
    correquisitosAsignatura: ['']
  })

  allAsignaturasForm = this.formBuilder.group({
    allAsignatura: ['']
  })

  ngOnInit() {
    this.getAsignaturas();
    this.getCorrequisitos();
    this.getPrerrequisitos();
    this.getAllAsignaturas();
  }

  getAsignaturas(): void {
    this.silaboService.getAsignaturas()
        .subscribe(asignaturas => this.asignaturas = asignaturas);
  }

  getCorrequisitos(): void {
    this.silaboService.getCorrequisitos()
        .subscribe(correquisitosAsignatura => this.correquisitosAsignatura = correquisitosAsignatura);
  }

  getPrerrequisitos(): void {
    this.silaboService.getPrerrequisitos()
        .subscribe(prerrequisitosAsignatura => this.prerrequisitosAsignatura = prerrequisitosAsignatura);
  }

  getAllAsignaturas(): void {
    this.silaboService.getAllAsignaturas()
        .subscribe(allAsignatura => this.allAsignatura = allAsignatura);
  }

    submit() {
      alert(JSON.stringify(this.asignaturasForm.value))
    }
  }


