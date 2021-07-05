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
import { MatTabsModule } from '@angular/material/tabs';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage'; //storage
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PresentacionDocenteComponent } from './components/presentacion-docente/presentacion-docente.component';
import { RegistroDocenteComponent } from './components/registro-docente/registro-docente.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { NgFallimgModule } from 'ng-fallimg';
import { PasosDocenteComponent } from './components/pasos-docente/pasos-docente.component';
import { PagoComponent } from './components/pago/pago/pago.component';
import { PagoDepositoComponent } from './components/pago/components/pago-deposito/pago-deposito/pago-deposito.component';
import { PagoMoneComponent } from './components/pago/components/pago-mone/pago-mone/pago-mone.component';
import { PagoTarjetaComponent } from './components/pago/components/pago-tarjeta/pago-tarjeta/pago-tarjeta.component';


@NgModule({
  declarations: [DocenteComponent, PresentacionDocenteComponent, RegistroDocenteComponent, PasosDocenteComponent, PagoComponent, PagoDepositoComponent, PagoMoneComponent, PagoTarjetaComponent],
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
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule, //storage
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBbjahv-8segzC1493vVNC1NYoM8s_VUPw",
      authDomain: "lms-academia-d36db.firebaseapp.com",
      databaseURL: "https://lms-academia-d36db-default-rtdb.firebaseio.com",
      projectId: "lms-academia-d36db",
      storageBucket: "lms-academia-d36db.appspot.com",
      messagingSenderId: "906083958185",
      appId: "1:906083958185:web:f85f66b156f9b4834858b8",
      measurementId: "G-VTLLWP484Y"
    })
  ],
  exports: [
    RegistroDocenteComponent
  ]
})
export class DocenteModule { }
