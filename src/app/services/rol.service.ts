import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  API_BACKEND = environment.urlBackend;
  constructor(public http: HttpClient) { }

  listarRoles() {
    return this.http.get(this.API_BACKEND + 'roles');
  }

  eliminarRolEncuesta(id) {
    return this.http.get(this.API_BACKEND + 'encuesta/eliminar-rol/' + id);
  }

  registrarRolEncuesta(id, datos) {
    return this.http.put(this.API_BACKEND + 'encuesta/registrar-rol/' + id, datos);
  }
  mostrarRolEncuesta(id: number): any{
    return this.http.get(this.API_BACKEND + 'roles/encuesta/' + id);
  }

}
