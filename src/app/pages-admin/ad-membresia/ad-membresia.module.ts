import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdMembresiaRoutingModule } from './ad-membresia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { MembresiaComponent } from './components/membresia/membresia/membresia.component';
import { CrearMembresiaComponent } from './components/crear-membresia/crear-membresia/crear-membresia.component';
import { EditarMembresiaComponent } from './components/editar-membresia/editar-membresia/editar-membresia.component';
import { SolicitudesMembresiaComponent } from './solicitudes-membresia/solicitudes-membresia/solicitudes-membresia.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [MembresiaComponent, CrearMembresiaComponent, EditarMembresiaComponent, SolicitudesMembresiaComponent],
  imports: [
    CommonModule,
    AdMembresiaRoutingModule,
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AdMembresiaModule { }
