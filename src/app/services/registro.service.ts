import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
/*
    * Descripcion: Este servicio sirve para el registro de usuarios.
    * @Autor: Alex Aguilar
  */
export class RegistroService {
  // API_BACKEND ruta donde esta alojado el Backend
  API_BACKEND = environment.urlBackend;

  constructor(private http: HttpClient) { }
  /*
      * Tipo: POST
      * Parameros:datos de tipo [any] para mandar el objeto para el nuevo registro
    */
  // tslint:disable-next-line: typedef
  registrarUsuario(datos: any) {
    return this.http.post(this.API_BACKEND + 'usuario/registrar', datos);
  }
}
