import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolGuard } from '../guards/rol.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
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
    path: 'encuestas',
    canActivate: [RolGuard],
    loadChildren: () => import('./ad-pregunta/ad-pregunta.module').then(m => m.AdPreguntaModule)
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
