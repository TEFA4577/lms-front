import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolGuard } from '../guards/rol.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  /*{
    path:'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/ad')
  },*/
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./ad-curso/ad-curso.module').then(m => m.AdCursoModule)
  },
  {
    path: 'usuarios',
    canActivate: [RolGuard],
    loadChildren: () => import('./ad-usuario/ad-usuario.module').then(m => m.AdUsuarioModule)
  },
  {
    path: 'etiquetas',
    canActivate: [RolGuard],
    loadChildren: () => import('./ad-etiqueta/ad-etiqueta.module').then(m => m.AdEtiquetaModule)
  },
  {
    path: 'preguntas-frecuentes',
    canActivate: [RolGuard],
    loadChildren: () => import('./ad-pregunta/ad-pregunta.module').then(m => m.AdPreguntaModule)
  },
  {
    path: 'membresias',
    canActivate: [RolGuard],
    loadChildren: () => import('./ad-membresia/ad-membresia.module').then(m => m.AdMembresiaModule)
  },
  {
    path: 'encuestas',
    canActivate: [RolGuard],
    loadChildren: () => import('./ad-encuestas/ad-encuestas.module').then(m => m.AdEncuestasModule)
  },
  {
    path: '**',
    redirectTo: 'cursos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesAdminRoutingModule { }
