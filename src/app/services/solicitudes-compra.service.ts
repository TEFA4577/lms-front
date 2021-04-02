import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesCompraService {

  API_BACKEND = environment.urlBackend;

  constructor(private http: HttpClient) {

  }
  // cursos en espera de confirmacion
  cursosSolicitados() {
    return this.http.get(this.API_BACKEND + 'cursos-solicitados');
  }
  habiliarCurso(id, estado) {
    return this.http.get(this.API_BACKEND + 'habilitar-curso/' + id + '/' + estado);
  }

}
