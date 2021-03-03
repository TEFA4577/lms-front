import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgFallimgModule } from 'ng-fallimg';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgFallimgModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule
  ]
})
export class InicioModule { }
