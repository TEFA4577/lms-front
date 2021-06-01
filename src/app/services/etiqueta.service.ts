import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  API_BACKEND = environment.urlBackend;
  constructor(public http: HttpClient) { }
  // tslint:disable-next-line: typedef
  listarEtiquetas() {
    return this.http.get(this.API_BACKEND + 'etiquetas');
  }
  registrarEtiqueta(datos: any): any {
    return this.http.post(this.API_BACKEND + 'etiquetas/registrar', datos);
  }
  mostarEtiqueta(id: number): any {
    return this.http.get(this.API_BACKEND + 'etiquetas/mostrar/' + id);
  }
  actualizarEtiqueta(id: number, datos: any): any {
    return this.http.post(this.API_BACKEND + 'etiquetas/actualizar/' + id, datos);
  }
  cambiarImagenEtiqueta(datos: any): any {
    return this.http.post(this.API_BACKEND + 'etiquetas/cambiar-imagen', datos);
  }
  cambiarEstado(id: number): any {
    return this.http.get(this.API_BACKEND + 'etiquetas');
  }
  eliminarEtiquetasCurso(id) {
    return this.http.get(this.API_BACKEND + 'cursos/eliminar-etiquetas/' + id);
  }
  registrarEtiquetaCurso(id, datos) {
    return this.http.put(this.API_BACKEND + 'cursos/registrar-etiqueta/' + id, datos);
  }
  mostrarEtiquetaCurso(id: number): any{
    return this.http.get(this.API_BACKEND + 'etiquetas/cursos/' + id);
  }
}
