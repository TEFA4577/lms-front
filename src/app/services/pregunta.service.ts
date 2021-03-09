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
  mostrarPregunta() {
    return this.http.get(this.API_BACKEND + 'pregunta/list');
  }
  datosPregunta(id) {
    return this.http.get(this.API_BACKEND + 'pregunta/mostrar/' + id);
  }
  mostrarRepuesta() {
    return this.http.get(this.API_BACKEND + 'respuesta_pregunta/list');
  }
  registrarRespuesta(datos) {
    return this.http.post(this.API_BACKEND + 'respuesta_pregunta/registrar', datos);
  }
  actualizarPregunta(id: number, datos: any) {
    return this.http.put(this.API_BACKEND + 'pregunta/actualizar/' + id, datos);
  }

}
