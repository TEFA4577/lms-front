import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentacionCursoComponent } from './components/presentacion-curso/presentacion-curso.component';
import { CursoComponent } from './components/curso/curso.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ListadoCategoriasComponent } from './components/listado-categorias/listado-categorias.component';
import { ListadoCursosComponent } from './components/listado-cursos/listado-cursos.component';
import { DetallesCategoriasComponent } from './components/detalles-categorias/detalles-categorias.component';


const routes: Routes = [
  {
    path: 'curso-contenido/:id',
    canActivate: [AuthGuard],
    component: CursoComponent
  }, {
    path: 'curso-detalle/:id', // creo una ruta
    component: PresentacionCursoComponent // llamo al componente
  },
  {
    path: 'cursos-general',
    component: ListadoCursosComponent
  },
  {
    path: 'cursos-categorias/:id',
    component: DetallesCategoriasComponent
  },
  {
    path: 'categorias',
    component: ListadoCategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  /*imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],*/
})
export class CursoRoutingModule {

}
