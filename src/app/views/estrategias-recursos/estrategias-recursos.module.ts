import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { EstrategiasRecursosComponent } from './estrategias-recursos.component';
import { EstrategiasRecursosRoutingModule } from './estrategias-recursos-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EstrategiasRecursosRoutingModule,
    ButtonsModule.forRoot(),
    TabsModule,
    HttpClientModule
  ],
  declarations: [ EstrategiasRecursosComponent ]
})
export class EstrategiasRecursosModule { }






