import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembresiaRoutingModule } from './membresia-routing.module';
import { PagoComponent } from './components/pago/pago/pago.component';
import { MembresiaComponent } from './components/membresia/membresia/membresia.component';
import { ListadoMembresiaComponent } from './components/listado-membresia/listado-membresia/listado-membresia.component';
//import { PagoDepositoComponent } from './components/pago/components/pago-deposito/pago-deposito.component';
//import { PagoMoneComponent } from './components/pago/components/pago-mone/pago-mone.component';
//import { PagoTarjetaComponent } from './components/pago/components/pago-tarjeta/pago-tarjeta.component';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { NgFallimgModule } from 'ng-fallimg';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [PagoComponent, ListadoMembresiaComponent, MembresiaComponent],
  imports: [
    CommonModule,
    MembresiaRoutingModule,
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
  ]
})
export class MembresiaModule { }
