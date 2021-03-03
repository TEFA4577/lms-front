import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { MisCursosAdquiridosComponent } from './components/mis-cursos-adquiridos/mis-cursos-adquiridos.component';


const routes: Routes = [
  {
    path: 'mis-cursos-adquiridos',
    component: MisCursosAdquiridosComponent
  },
  {
    path: 'mi-perfil',
    component: EstudianteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
