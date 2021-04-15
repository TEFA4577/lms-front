import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesAdminRoutingModule } from './pages-admin-routing.module';
import { AdEvaluacionesComponent } from './ad-evaluaciones/ad-evaluaciones.component';


@NgModule({
  imports: [
    CommonModule,
    PagesAdminRoutingModule
  ],
  declarations: [AdEvaluacionesComponent]
})
export class PagesAdminModule { }
