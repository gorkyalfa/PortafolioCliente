import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { EstrategiasRecursosComponent } from './estrategias-recursos.component';
import { EstrategiasRecursosRoutingModule } from './estrategias-recursos-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EstrategiasRecursosRoutingModule,
    ButtonsModule.forRoot(),
    TabsModule
  ],
  declarations: [ EstrategiasRecursosComponent ]
})
export class EstrategiasRecursosModule { }






