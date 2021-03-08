import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdPreguntaRoutingModule } from './ad-pregunta-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CrearPreguntaComponent } from './components/crear-pregunta/crear-pregunta.component';
import { EditarPreguntaComponent } from './components/editar-pregunta/editar-pregunta.component';

@NgModule({
  declarations: [PreguntasComponent, CrearPreguntaComponent, EditarPreguntaComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    AdPreguntaRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AdPreguntaModule { }
