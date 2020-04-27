import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CrearSilaboComponent } from './crear-silabo.component';
import { CrearSilaboRoutingModule } from './crear-silabo-routing.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { VerSilaboComponent } from './ver-silabo/ver-silabo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CrearSilaboRoutingModule,
    DataTablesModule,
    ButtonsModule.forRoot(),
    TabsModule,
    CollapseModule,
    TreeModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [ CrearSilaboComponent, VerSilaboComponent ]
})
export class CrearSilaboModule { }


