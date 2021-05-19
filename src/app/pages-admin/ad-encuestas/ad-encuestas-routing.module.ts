import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { ResultadosEncuestasComponent } from './components/resultados-encuestas/resultados-encuestas.component';

const routes: Routes = [
  {
    path: '',
    component: EncuestasComponent
  },
  {
    path: 'resultados',
    component: ResultadosEncuestasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdEncuestasRoutingModule { }
