import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MisCursosAdquiridosComponent } from './components/mis-cursos-adquiridos/mis-cursos-adquiridos.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditarEstudianteComponent } from './components/editar-estudiante/editar-estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [EstudianteComponent, MisCursosAdquiridosComponent, EditarEstudianteComponent],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class EstudianteModule { }
