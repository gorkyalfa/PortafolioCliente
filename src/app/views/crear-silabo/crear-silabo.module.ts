import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CrearSilaboComponent } from './crear-silabo.component';
import { CrearSilaboRoutingModule } from './crear-silabo-routing.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CrearSilaboRoutingModule,
    DataTablesModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ CrearSilaboComponent ]
})
export class CrearSilaboModule { }


