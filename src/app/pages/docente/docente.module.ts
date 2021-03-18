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
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PresentacionDocenteComponent } from './components/presentacion-docente/presentacion-docente.component';
import { RegistroDocenteComponent } from './components/registro-docente/registro-docente.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { NgFallimgModule } from 'ng-fallimg';
import { PasosDocenteComponent } from './components/pasos-docente/pasos-docente.component';


@NgModule({
  declarations: [DocenteComponent, PresentacionDocenteComponent, RegistroDocenteComponent, PasosDocenteComponent],
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
    MatChipsModule,
    NgFallimgModule,
    MatTabsModule
  ],
  exports: [
    RegistroDocenteComponent
  ]
})
export class DocenteModule { }
