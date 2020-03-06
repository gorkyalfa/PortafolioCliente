import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { EstrategiasRecursosComponent } from './estrategias-recursos.component';
import { EstrategiasRecursosRoutingModule } from './estrategias-recursos-routing.module';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EstrategiasRecursosRoutingModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ EstrategiasRecursosComponent ]
})
export class EstrategiasRecursosModule { }






