import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DescripcionObjetivosComponent } from './descripcion-objetivos.component';
import { DescripcionObjetivosRoutingModule } from './descripcion-objetivos-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DescripcionObjetivosRoutingModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DescripcionObjetivosComponent ]
})
export class DescripcionObjetivosModule { }
