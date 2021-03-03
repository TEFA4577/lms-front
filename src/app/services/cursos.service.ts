import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // API_BACKEND ruta donde esta alojado el Backend
  API_BACKEND = environment.urlBackend;

  constructor(private http: HttpClient) { }

  listarCursos(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'cursos', { headers });
  }

  // Presentacion del curso por su id
  presentacionCurso(id): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'cursos/mostrar/' + id, { headers });
  }

  cursarCurso(id): any {
    return this.http.get(this.API_BACKEND + 'cursar-curso/' + id);
  }

  // Categorias o etiquetas en general
  etiquetaCurso(): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'etiquetas', { headers });
  }

  // Presentacion del Docente por su id
  // tslint:disable-next-line: typedef
  presentacionDocente(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'docentes/mostrar/' + id, { headers });
  }

  // tslint:disable-next-line: typedef
  presentacionClase(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'clases/mostrar/' + id, { headers });
  }

  // tslint:disable-next-line: typedef
  listarCursosNoAprobados() {
    return this.http.get(this.API_BACKEND + 'cursos-no-revisados');
  }
  // tslint:disable-next-line: typedef
  listarCursosCreados() {
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    return this.http.get(this.API_BACKEND + 'usuario/cursos-creados/' + id);
  }
  // tslint:disable-next-line: typedef
  registrarCurso(datos) {
    return this.http.post(this.API_BACKEND + 'cursos/registrar', datos);
  }
  // tslint:disable-next-line: typedef
  actualizarCurso(datos: any, id: number) {
    return this.http.post(this.API_BACKEND + 'cursos/actualizar/' + id, datos);
  }
  // tslint:disable-next-line: typedef
  eliminarCurso(id) {
    return this.http.get(this.API_BACKEND + 'cursos/eliminar/' + id);
  }
  // tslint:disable-next-line: typedef
  cambiarImagenCurso(datos: any) {
    return this.http.post(this.API_BACKEND + 'cursos/cambiar-imagen/', datos);
  }
  // tslint:disable-next-line: typedef
  registrarModulo(datos) {
    return this.http.post(this.API_BACKEND + 'modulos/registrar', datos);
  }
  // tslint:disable-next-line: typedef
  actualizarModulo(datos: any, id: number) {
    return this.http.put(this.API_BACKEND + 'modulos/actualizar/' + id, datos);
  }
  // tslint:disable-next-line: typedef
  eliminarModulo(id: number) {
    return this.http.get(this.API_BACKEND + 'modulos/eliminar/' + id);
  }
  // tslint:disable-next-line: typedef
  registrarClase(datos) {
    return this.http.post(this.API_BACKEND + 'clases/registrar', datos);
  }
  // tslint:disable-next-line: typedef
  actualizarClase(datos, id) {
    return this.http.put(this.API_BACKEND + 'clases/actualizar/' + id, datos);
  }
  // tslint:disable-next-line: typedef
  cambiarVideoClase(datos) {
    return this.http.post(this.API_BACKEND + 'clases/cambiar-video', datos);
  }

  // tslint:disable-next-line: typedef
  datosModulo(id) {
    return this.http.get(this.API_BACKEND + 'modulos/mostrar/' + id);
  }

  // tslint:disable-next-line: typedef
  datosClase(id) {
    return this.http.get(this.API_BACKEND + 'clases/mostrar/' + id);
  }
  // tslint:disable-next-line: typedef
  eliminarClase(id) {
    return this.http.get(this.API_BACKEND + 'clases/eliminar/' + id);
  }
  // tslint:disable-next-line: typedef
  registarRecurso(datos) {
    return this.http.post(this.API_BACKEND + 'recursos/registrar', datos);
  }
  // tslint:disable-next-line: typedef
  eliminarRecurso(id) {
    return this.http.get(this.API_BACKEND + 'recursos/eliminar/' + id);
  }
  // tslint:disable-next-line: typedef
  cambiarEstadoCurso(datos: any) {
    return this.http.post(this.API_BACKEND + 'cursos/cambiar-estado', datos);
  }
  // tslint:disable-next-line: typedef
  progresoCurso(datos, id) {
    return this.http.put(this.API_BACKEND + 'progreso-curso/' + id, datos);
  }
  //comentarios por clase
  registarComentario(datos) {
    return this.http.post(this.API_BACKEND + 'comentarios/registrar', datos);
  }
  registrarRespuesta(datos){
    return this.http.post(this.API_BACKEND + 'comentarios/respuesta/registrar', datos);
  }
  mostrarComentario(id){
    return this.http.get(this.API_BACKEND + 'comentarios/clase/' + id);
  }
  // tslint:disable-next-line: typedef
  certificado(id){
    return this.http.get(this.API_BACKEND + 'certificado/' + id);
  }
  busquedaCurso(datos){
    return this.http.get(this.API_BACKEND + 'cursos/buscar/', datos);
  }
}
