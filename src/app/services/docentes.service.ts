import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  // tslint:disable-next-line: typedef
  getOneEmployee(id: any) {
    throw new Error('Method not implemented.');
  }

  // API_BACKEND ruta donde esta alojado el Backend
  API_BACKEND = environment.urlBackend;
  constructor(private http: HttpClient) { }

  // presentacion del docente por su id
  // tslint:disable-next-line: typedef
  mostrarDocente(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'docentes/mostrar/' + id, { headers });
  }
  // Lista de docentes en general
  // tslint:disable-next-line: typedef
  listarDocente() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'docentes', { headers });
  }
  // tslint:disable-next-line: typedef
  registrarDocente(datos: any) {
    return this.http.post(this.API_BACKEND + 'docentes/registrar', datos);
  }
  // tslint:disable-next-line: typedef
  actualizarDocente(datos: any, id: any) {
    return this.http.put(this.API_BACKEND + 'docentes/actualizar/' + id, datos);
  }
  cursoDeDocente(id){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.API_BACKEND + 'cursos-de-docente/' + id, { headers })
  }
}
