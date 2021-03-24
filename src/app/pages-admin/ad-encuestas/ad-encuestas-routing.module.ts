import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestasComponent } from './components/encuestas/encuestas.component';

const routes: Routes = [
  {
    path: 'listado-encuestas',
    component: EncuestasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdEncuestasRoutingModule { }
