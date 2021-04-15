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
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { CrearMembresiaComponent } from './components/crear-membresia/crear-membresia.component';
import { EditarMembresiaComponent } from './components/editar-membresia/editar-membresia.component';
import { SolicitudesMembresiaComponent } from './solicitudes-membresia/solicitudes-membresia.component';
import { MatTableModule } from '@angular/material/table';
import { SolicitudesCompraService } from '../../services/solicitudes-compra.service';
import { ListadoMembresiaComponent } from './components/listado-membresia/listado-membresia.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoDepositoComponent } from './components/pago/components/pago-deposito/pago-deposito.component';
import { PagoMoneComponent } from './components/pago/components/pago-mone/pago-mone.component';
import { PagoTarjetaComponent } from './components/pago/components/pago-tarjeta/pago-tarjeta.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { NgFallimgModule } from 'ng-fallimg';
import { FreeComponent } from './components/pago/components/free/free.component';

@NgModule({
  declarations: [
    MembresiaComponent,
    CrearMembresiaComponent,
    EditarMembresiaComponent,
    SolicitudesMembresiaComponent,
    ListadoMembresiaComponent,
    PagoComponent,
    PagoDepositoComponent,
    PagoMoneComponent,
    PagoTarjetaComponent,
    FreeComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    NgFallimgModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    AdMembresiaRoutingModule,
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatChipsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    SolicitudesCompraService
  ],
  exports: [
    MatInputModule, PagoDepositoComponent, PagoMoneComponent, PagoTarjetaComponent,
  ],
})
export class AdMembresiaModule { }
