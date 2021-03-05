import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdPreguntaRoutingModule } from './ad-pregunta-routing.module';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PreguntasComponent],
  imports: [
    CommonModule,
    AdPreguntaRoutingModule,
    MatExpansionModule
  ]
})
export class AdPreguntaModule { }
