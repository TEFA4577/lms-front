import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembresiaComponent } from './components/membresia/membresia/membresia.component';
import { SolicitudesMembresiaComponent } from './solicitudes-membresia/solicitudes-membresia/solicitudes-membresia.component'
import { RolGuard } from 'src/app/guards/rol.guard';
const routes: Routes = [
  {
    path: '',
    component: MembresiaComponent
  },
  {
    path: 'solicitudes',
    canActivate: [RolGuard],
    component: SolicitudesMembresiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdMembresiaRoutingModule { }
