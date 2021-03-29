import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdCursoRoutingModule } from './ad-curso-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CrearCursoComponent } from './components/crear-curso/crear-curso.component';
import { ListadoCursoComponent } from './components/listado-curso/listado-curso.component';
import { AdministrarCursoComponent } from './components/administrar-curso/administrar-curso.component';
import { CrearModuloComponent } from './components/modulos/crear-modulo/crear-modulo.component';
import { CrearClaseComponent } from './components/clases/crear-clase/crear-clase.component';
import { EditarClaseComponent } from './components/clases/editar-clase/editar-clase.component';
import { EditarModuloComponent } from './components/modulos/editar-modulo/editar-modulo.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { ListaAdCursoComponent } from './lista-ad-curso/lista-ad-curso.component';
import { DetalleCursoComponent } from './components/detalle-curso/detalle-curso.component';
import { EtiquetasComponent } from './components/etiquetas/etiquetas.component';
import { SolicitudesCursoComponent } from './solicitudes-curso/solicitudes-curso.component';
import { ListadoCursoEstudianteComponent } from './components/listado-curso-estudiante/listado-curso-estudiante.component';
import { TutorialCursoComponent } from './components/tutorial-curso/tutorial-curso.component';
import { AdministrarEstadoCursoComponent } from './components/administrar-estado-curso/administrar-estado-curso.component';

@NgModule({
  declarations: [
    CrearCursoComponent,
    ListadoCursoComponent,
    AdministrarCursoComponent,
    CrearModuloComponent,
    CrearClaseComponent,
    EditarClaseComponent,
    EditarModuloComponent,
    RecursosComponent,
    ListaAdCursoComponent,
    DetalleCursoComponent,
    EtiquetasComponent,
    SolicitudesCursoComponent,
    ListadoCursoEstudianteComponent,
    TutorialCursoComponent,
    AdministrarEstadoCursoComponent,
  ],
  imports: [
    CommonModule,
    AdCursoRoutingModule,
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
  ]
})
export class AdCursoModule { }
