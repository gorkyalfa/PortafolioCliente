import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearSilaboComponent } from './crear-silabo.component';

const routes: Routes = [
  {
    path: '',
    component: CrearSilaboComponent,
    data: {
      title: 'Crear Sílabo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearSilaboRoutingModule { }






