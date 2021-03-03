import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdUsuarioRoutingModule } from './ad-usuario-routing.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    AdUsuarioRoutingModule
  ]
})
export class AdUsuarioModule { }
