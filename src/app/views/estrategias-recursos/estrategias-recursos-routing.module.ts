import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstrategiasRecursosComponent } from './estrategias-recursos.component';

const routes: Routes = [
  {
    path: '',
    component: EstrategiasRecursosComponent,
    data: {
      title: 'DescripcionObjetivos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstrategiasRecursosRoutingModule { }



