import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoCursoComponent } from './components/listado-curso/listado-curso.component';
import { AdministrarCursoComponent } from './components/administrar-curso/administrar-curso.component';
import { ListaAdCursoComponent } from './lista-ad-curso/lista-ad-curso.component';
import { SolicitudesCursoComponent } from './solicitudes-curso/solicitudes-curso.component';
import { RolGuard } from 'src/app/guards/rol.guard';

const routes: Routes = [
  {
    path: 'mis-cursos',
    component: ListadoCursoComponent,
  },
  {
    path: 'administrar/:id',
    component: AdministrarCursoComponent,
  },
  {
    path: 'lista',
    canActivate: [RolGuard],
    component: ListaAdCursoComponent,
  },
  {
    path: 'solicitudes',
    canActivate: [RolGuard],
    component: SolicitudesCursoComponent,
  },
  {
    path: '**',
    redirectTo: 'mis-cursos'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdCursoRoutingModule { }
