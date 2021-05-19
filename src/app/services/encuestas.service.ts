import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  API_BACKEND = environment.urlBackend;
  constructor(public http: HttpClient) { }

  registrarEncuesta(datos: any){
    return this.http.post(this.API_BACKEND + 'encuesta/registrar', datos);
  }
  listarEncuestas(){
    return this.http.get(this.API_BACKEND + 'encuestas/list');
  }
  mostrarEncuesta(id){
    return this.http.get(this.API_BACKEND + 'encuesta/mostrar/' + id);
  }
  actualizarEncuesta(id: number, datos: any) {
    return this.http.put(this.API_BACKEND + 'encuesta/actualizar/' + id, datos);
  }
  eliminarEncuesta(id) {
    return this.http.get(this.API_BACKEND + 'encuesta/eliminar/' + id);
  }
  mostrarPregunta(id){
    return this.http.get(this.API_BACKEND + 'encuesta-preguntas/mostrar/' + id);
  }
  cantidadRes(id){
    return this.http.get(this.API_BACKEND + 'encuesta-respuestas/cantidad/' + id);
  }
  listarPreguntasEncuestas(){
    return this.http.get(this.API_BACKEND + 'encuesta-preguntas/list');
  }
  datosPregunta() {
    return this.http.get(this.API_BACKEND + 'encuesta-preguntas/list');
  }
  registrarPregunta(datos: any): any {
    return this.http.post(this.API_BACKEND + 'encuesta/registrar-pregunta', datos);
  }
  actualizarPregunta(id: number, datos: any) {
    return this.http.put(this.API_BACKEND + 'encuesta/actualizar-pregunta/' + id, datos);
  }
  eliminarPregunta(id) {
    return this.http.get(this.API_BACKEND + 'encuesta/eliminar-pregunta/' + id);
  }
  registrarRespuesta(datos: any): any {
    return this.http.post(this.API_BACKEND + 'encuesta/registrar-respuesta', datos);
  }

}
