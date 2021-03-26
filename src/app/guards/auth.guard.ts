import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  estado: boolean;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.estado = this.usuarioService.estadoSession();
  }
  /**
   * Descripcion: La funcion verifica el estado de session si el usuario esta logeado y da permiso
   * de acceder a la ruta en caso contrario redirecciona al login
   * @author @AlexAguilarP
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.estado = this.usuarioService.estadoSession();
    if (!this.estado) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no Identificado',
        text: 'inicia sesion para poder acceder!',
      });
      this.router.navigate(['/inicio']);
    }
    return this.estado;
  }
}
