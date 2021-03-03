import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtiquetasComponent } from './components/etiquetas/etiquetas.component';

const routes: Routes = [
  {
    path: '',
    component: EtiquetasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdEtiquetaRoutingModule { }
