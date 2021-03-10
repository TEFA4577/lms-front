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
  actualizarPregunta(id: number, datos: any) {
    return this.http.put(this.API_BACKEND + 'pregunta/actualizar/' + id, datos);
  }
  mostrarRepuesta(id) {
    return this.http.get(this.API_BACKEND + 'respuesta-pregunta/list/' + id);
  }
  registrarRespuesta(datos) {
    return this.http.post(this.API_BACKEND + 'respuesta-pregunta/registrar', datos);
  }
  actualizarRespuesta(id: number, datos:any){
    return this.http.put(this.API_BACKEND+ 'respuesta-pregunta/actualizar/' + id, datos);
  }
  datosRespuesta(id){
    return this.http.get(this.API_BACKEND+ 'respuesta-pregunta/mostrar/' + id);
  }
}
