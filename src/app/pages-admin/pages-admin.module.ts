import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesAdminRoutingModule } from './pages-admin-routing.module';
import { CrearEncuestaComponent } from './ad-encuestas/components/crear-encuesta/crear-encuesta.component';
import { EncuestasComponent } from './ad-encuestas/components/encuestas/encuestas.component';
import { EditarEncuestaComponent } from './ad-encuestas/components/editar-encuesta/editar-encuesta.component';


@NgModule({
  declarations: [CrearEncuestaComponent, EncuestasComponent, EditarEncuestaComponent],
  imports: [
    CommonModule,
    PagesAdminRoutingModule
  ]
})
export class PagesAdminModule { }
