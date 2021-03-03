import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { DocenteComponent } from './components/docente/docente.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PresentacionDocenteComponent } from './components/presentacion-docente/presentacion-docente.component';
import { RegistroDocenteComponent } from './components/registro-docente/registro-docente.component';
import { EditarDocenteComponent } from './components/editar-docente/editar-docente.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [DocenteComponent, PresentacionDocenteComponent, RegistroDocenteComponent, EditarDocenteComponent],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  exports: [
    RegistroDocenteComponent
  ]
})
export class DocenteModule { }
