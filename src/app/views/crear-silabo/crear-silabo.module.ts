import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CrearSilaboComponent } from './crear-silabo.component';
import { CrearSilaboRoutingModule } from './crear-silabo-routing.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CrearSilaboRoutingModule,
    DataTablesModule,
    ButtonsModule.forRoot(),
    TabsModule,
    CollapseModule
  ],
  declarations: [ CrearSilaboComponent ]
})
export class CrearSilaboModule { }


