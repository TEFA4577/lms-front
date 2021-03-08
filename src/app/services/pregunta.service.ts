import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  API_BACKEND = environment.urlBackend;
  constructor(public http: HttpClient) { }

  registrarPregunta(datos: any): any {
    return this.http.post(this.API_BACKEND + 'pregunta/registrar', datos);
  }
  mostrarPregunta(){
    return this.http.get(this.API_BACKEND + 'pregunta/list');
  }
  /*mostrarRepuesta(){
    return this.http.get(this.API_BACKEND + 'respuesta-pregunta-frecuente/list');
  }*/
}
