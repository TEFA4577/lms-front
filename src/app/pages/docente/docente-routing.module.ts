import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocenteComponent } from './components/docente/docente.component';
import { PresentacionDocenteComponent } from './components/presentacion-docente/presentacion-docente.component';
import { RegistroDocenteComponent } from './components/registro-docente/registro-docente.component';

const routes: Routes = [
  {
    path: 'listado-instructores',
    component: DocenteComponent
  },
  {
    path: 'presentacion-docente/:id',
    component: PresentacionDocenteComponent
  },
  {
    path: 'registro-docente',
    component: RegistroDocenteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }
