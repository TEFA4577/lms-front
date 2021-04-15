import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './components/curso/curso.component';
import { PresentacionCursoComponent } from './components/presentacion-curso/presentacion-curso.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PagoComponent } from './components/pago/pago.component';
import { PagoDepositoComponent } from './components/pago/components/pago-deposito/pago-deposito.component';
import { PagoMoneComponent } from './components/pago/components/pago-mone/pago-mone.component';
import { PagoTarjetaComponent } from './components/pago/components/pago-tarjeta/pago-tarjeta.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ListadoCursosComponent } from './components/listado-cursos/listado-cursos.component';
import { DetallesCategoriasComponent } from './components/detalles-categorias/detalles-categorias.component';
import { MatChipsModule } from '@angular/material/chips';
import { ComentariosCursoComponent } from './components/curso/comentarios-curso/comentarios-curso.component';
import { ListadoCategoriasComponent } from './components/listado-categorias/listado-categorias.component';
import { RespuestasCursoComponent } from './components/curso/respuestas-curso/respuestas-curso.component';
import { NgFallimgModule } from 'ng-fallimg';
import { FreeComponent } from './components/pago/components/free/free.component';

@NgModule({
  declarations: [
    CursoComponent,
    PresentacionCursoComponent,
    PagoComponent,
    PagoDepositoComponent,
    PagoMoneComponent,
    PagoTarjetaComponent,
    ListadoCursosComponent,
    DetallesCategoriasComponent,
    ComentariosCursoComponent,
    ListadoCategoriasComponent,
    RespuestasCursoComponent,
    FreeComponent
  ],
  imports: [
    CommonModule,
    CursoRoutingModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatChipsModule,
    NgFallimgModule
  ],
  providers: [
    DatePipe,
  ],
  exports:
    [MatInputModule, PagoDepositoComponent, PagoMoneComponent, PagoTarjetaComponent, FreeComponent
    ],
})
export class CursoModule { }
