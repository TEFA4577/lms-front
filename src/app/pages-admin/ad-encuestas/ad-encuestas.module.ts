import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdEncuestasRoutingModule } from './ad-encuestas-routing.module';

import { CrearEncuestaComponent } from './components/crear-encuesta/crear-encuesta.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { EditarEncuestaComponent } from './components/editar-encuesta/editar-encuesta.component';


@NgModule({
  declarations: [
    CrearEncuestaComponent,
    EncuestasComponent,
    EditarEncuestaComponent
  ],
  imports: [
    CommonModule,
    AdEncuestasRoutingModule
  ]
})
export class AdEncuestasModule { }
