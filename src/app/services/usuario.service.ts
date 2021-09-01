import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  API_BACKEND = environment.urlBackend;
  datosUsuario: any;
  constructor(private http: HttpClient) {
  }
  estadoSession(): boolean {
    let estado = false;
    if ('datosUsuario' in localStorage && 'token' in localStorage) {
      const usuario = localStorage.getItem('datosUsuario');
      const token = localStorage.getItem('token');
      if (usuario !== 'undefined' && token !== 'undefined') {
        estado = true;
        const id = JSON.parse(localStorage.getItem('datosUsuario'));
        this.http.get(this.API_BACKEND + 'informacion-usuario/' + id.id_usuario).subscribe(res => {
          const datos: any = res;
          localStorage.setItem('datosUsuario', JSON.stringify(datos.datosUsuario));
        }, e => console.log(e));
      } else {
        localStorage.removeItem('datosUsuario');
        localStorage.removeItem('token');
      }
    } else {
      estado = false;
    }
    return estado;
  }
  /**
   * Descripcion: esta funcion guarda el token que proporciona el backend
   */
  guardarToken(datos): void {
    localStorage.setItem('token', datos);
  }
  /**
   * Descripcion: esta funcion guarda la infomacion del usuario que inicio sesion
   */
  guardarDatosUsuario(datos): void {
    localStorage.setItem('datosUsuario', JSON.stringify(datos));
  }
  /**
   * Descripcion: esta funcion obtiene los datos guardados en la base de datos
   */
  obtenerDatosUsuario(): JSON {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      return (this.datosUsuario);
    }
  }

  sendMail(datos: any) {
    return this.http.post(this.API_BACKEND + 'usuario/send-email', datos);
  }

  resetPass(datos: any) {
    return this.http.post(this.API_BACKEND + 'usuario/reset-pass', datos);
  }

  /**
   * Descripcion: esta funcion obtiene los datos guardados en la base de datos
   */
  // tslint:disable-next-line: typedef
  adquirirCurso(datos: any) {
    return this.http.post(this.API_BACKEND + 'adquirir-curso', datos);
  }

  //MONE - PAGOS
  moneAdC(datos: any) {
    return this.http.post(this.API_BACKEND + 'mone', datos);
  }

  adquirirMembresia(datos: any) {
    return this.http.post(this.API_BACKEND + 'membresias/adquirir', datos);
  }
  // tslint:disable-next-line: typedef
  misCursos() {
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    return this.http.get(this.API_BACKEND + 'usuario/mis-cursos/' + id);
  }
  /*misSolicitudes(){
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    return this.http.get(this.API_BACKEND + 'usuario/mis-solicitudes/' + id);
  }*/
  // tslint:disable-next-line: typedef
  actualizarUsuario(datos, id) {
    return this.http.post(this.API_BACKEND + 'usuario/actualizar/' + id, datos);
  }
  // tslint:disable-next-line: typedef
  cambiarImagenPerfil(datos: any) {
    return this.http.post(this.API_BACKEND + 'usuario/cambiar-foto', datos);
  }
  usuarioRoles() {
    return this.http.get(this.API_BACKEND + 'usuario/roles');
  }
}
