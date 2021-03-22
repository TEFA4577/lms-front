import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembresiaComponent } from './components/membresia/membresia/membresia.component';
const routes: Routes = [
  {
    path: '',
    component: MembresiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdMembresiaRoutingModule { }
