import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoCursoComponent } from './components/listado-curso/listado-curso.component';
import { AdministrarCursoComponent } from './components/administrar-curso/administrar-curso.component';
import { ListaAdCursoComponent } from './lista-ad-curso/lista-ad-curso.component';
import { SolicitudesCursoComponent } from './solicitudes-curso/solicitudes-curso.component';
import { ListadoCursoEstudianteComponent } from './components/listado-curso-estudiante/listado-curso-estudiante.component';
import { TutorialCursoComponent } from './components/tutorial-curso/tutorial-curso.component';
import { AdministrarEstadoCursoComponent } from './components/administrar-estado-curso/administrar-estado-curso.component';
import { InfoCursoComponent } from './components/info-curso/info-curso.component';
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
    path: 'administar-cursos',
    canActivate: [RolGuard],
    component: AdministrarEstadoCursoComponent,
  },
  {
    path: 'contenido-detalles/:id',
    canActivate: [RolGuard],
    component: InfoCursoComponent
  },
  {
    path: 'estudiantes',
    canActivate: [RolGuard],
    component: ListadoCursoEstudianteComponent,
  },
  {
    path: 'tutoriales',
    canActivate: [RolGuard],
    component: TutorialCursoComponent,
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
