import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdEncuestasRoutingModule } from './ad-encuestas-routing.module';

import { CrearEncuestaComponent } from './components/crear-encuesta/crear-encuesta.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { EditarEncuestaComponent } from './components/editar-encuesta/editar-encuesta.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { EditarPreguntaComponent } from './components/editar-pregunta/editar-pregunta.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ResultadosEncuestasComponent } from './components/resultados-encuestas/resultados-encuestas.component';

@NgModule({
  declarations: [
    CrearEncuestaComponent,
    EncuestasComponent,
    EditarEncuestaComponent,
    CrearPreguntasComponent,
    EditarPreguntaComponent,
    UsuariosComponent,
    ResultadosEncuestasComponent
  ],
  imports: [
    CommonModule,
    AdEncuestasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ]
})
export class AdEncuestasModule { }
