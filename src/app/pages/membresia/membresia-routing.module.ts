import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoMembresiaComponent} from './components/listado-membresia/listado-membresia/listado-membresia.component';
import { MembresiaComponent } from './components/membresia/membresia/membresia.component';



const routes: Routes = [
  {
    path: 'membresia-general',
    component: ListadoMembresiaComponent
  },
  {
    path: 'docente-membresia',
    component: MembresiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembresiaRoutingModule { }
