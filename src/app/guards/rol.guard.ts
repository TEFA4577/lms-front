import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  rol: any;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.rol = this.usuarioService.obtenerDatosUsuario();
    console.log(this.rol);
  }
  /**
   * descripcion: La funcion verifica el rol del usuario que esta logeado y da permiso de acceder a la
   * ruta en caso contrario redirecciona al inicio
   * @author @AlexAguilarP
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.rol = this.usuarioService.obtenerDatosUsuario();
    if (this.rol.id_rol <= 2) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sin Permisos',
        text: 'No tienes los permisos para acceder!',
      });
      this.router.navigate(['/inicio']);
      return false;
    }
  }

}
