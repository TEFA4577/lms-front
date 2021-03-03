import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdEtiquetaRoutingModule } from './ad-etiqueta-routing.module';
import { EtiquetasComponent } from './components/etiquetas/etiquetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
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
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { CrearEtiquetaComponent } from './components/crear-etiqueta/crear-etiqueta.component';
import { EditarEtiquetaComponent } from './components/editar-etiqueta/editar-etiqueta.component';


@NgModule({
  declarations: [EtiquetasComponent, CrearEtiquetaComponent, EditarEtiquetaComponent],
  imports: [
    CommonModule,
    AdEtiquetaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatStepperModule,
  ]
})
export class AdEtiquetaModule { }
