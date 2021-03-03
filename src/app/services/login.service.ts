import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/*
    * Descripcion: Esta servicio sirve para el manejo de sesion de los usuarios en el backend
    * @Autor: Alex Aguilar
  */
export class LoginService {
  // API_BACKEND ruta donde esta alojado el Backend
  API_BACKEND = environment.urlBackend;
  constructor(private http: HttpClient) { }
  /*
      * Tipo: POST
      * Descripcion:la funcion realiza el inicio de sesion
    */
  // tslint:disable-next-line: typedef
  loginUsuario(datos: any) {
    return this.http.post(this.API_BACKEND + 'login', datos);
  }
  /**
   * Tipo: GET
   * Descripcion: esta funcion realiza el deslogeo del sistema en el backend
   */
  // tslint:disable-next-line: typedef
  logoutUsuario() {
    return this.http.get(this.API_BACKEND + 'logout');
  }
}
