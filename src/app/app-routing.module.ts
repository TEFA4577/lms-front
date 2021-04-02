import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard , RolGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages-admin/pages-admin.module').then(m => m.PagesAdminModule)
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('./pages/curso/curso.module').then(m => m.CursoModule)
      },
      {
        path: 'info',
        loadChildren: () => import('./pages/landing/landing.module').then(m =>m.LandingModule)
      },
      {
        path: 'instructores',
        loadChildren: () => import('./pages/docente/docente.module').then(m => m.DocenteModule)
      },
      {
        path: 'estudiante',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/estudiante/estudiante.module').then(m => m.EstudianteModule)
      },
      {
        path: 'membresia',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/membresia/membresia.module').then( m => m.MembresiaModule)
      },
      {
        path: '**',
        redirectTo: '/inicio'
      }
    ],
  }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
