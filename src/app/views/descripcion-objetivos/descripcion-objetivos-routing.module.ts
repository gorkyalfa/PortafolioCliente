import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescripcionObjetivosComponent } from './descripcion-objetivos.component';

const routes: Routes = [
  {
    path: '',
    component: DescripcionObjetivosComponent,
    data: {
      title: 'DescripcionObjetivos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescripcionObjetivosRoutingModule { }
