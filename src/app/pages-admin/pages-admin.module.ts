import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesAdminRoutingModule } from './pages-admin-routing.module';
import { EncuestaResultsComponent } from './dashboard/components/encuesta-results/encuesta-results.component';


@NgModule({
  imports: [
    CommonModule,
    PagesAdminRoutingModule
  ],
  declarations: [EncuestaResultsComponent]
})
export class PagesAdminModule { }
