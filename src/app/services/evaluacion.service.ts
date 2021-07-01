import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  API_BACKEND = environment.urlBackend;
  constructor(private http: HttpClient) { }

  listarPrueba(){
    return this.http.get(this.API_BACKEND + 'prueba');
  }
  datosPrueba(id){
    return this.http.get(this.API_BACKEND + 'prueba/mostrar/' + id);
  }
  registrarPrueba(datos){
    return this.http.post(this.API_BACKEND + 'prueba/registrar', datos);
  }
  actualizarPrueba(datos: any, id: number){
    return this.http.put(this.API_BACKEND + 'prueba/actualizar/' + id, datos);
  }
  eliminarPrueba(id) {
    return this.http.get(this.API_BACKEND + 'prueba/eliminar/' + id);
  }

  registrarOpcion(datos){
    return this.http.post(this.API_BACKEND + 'opcion/registrar', datos);
  }
  actualizarOpcion(datos, id){
    return this.http.put(this.API_BACKEND + 'opcion/actualizar/' + id, datos);
  }
  eliminarOpcion(id) {
    return this.http.get(this.API_BACKEND + 'opcion/eliminar/' + id);
  }
  datosOpcion(id){
    return this.http.get(this.API_BACKEND + 'opcion/mostrar/' + id);
  }
  darExamen(id){
    const date = JSON.parse(localStorage.getItem('datosUsuario'));
    const datos = date.id_usuario;
    return this.http.get(this.API_BACKEND + 'prueba-evaluar/' + id+ '/' + datos);
  }
  evaluarExamen(id, idC){
    const date = JSON.parse(localStorage.getItem('datosUsuario'));
    const idU = date.id_usuario;
    return this.http.get(this.API_BACKEND + 'prueba/evaluando/' + id + '/' + idC + '/' + idU);
  }
  postExamen(datos){
    return this.http.post(this.API_BACKEND + 'inicio/evaluacion', datos);
    // id_curso
    // id_usuario
    // progreso_evaluacion
  }
  progresoEvaluacion(id){
    const date = JSON.parse(localStorage.getItem('datosUsuario'));
    const datos = date.id_usuario;
    return this.http.get(this.API_BACKEND + 'evaluacion-progreso/' + id+ '/' +datos);
  }
}
