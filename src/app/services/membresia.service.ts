import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  API_BACKEND = environment.urlBackend;
  constructor(public http: HttpClient) { }

  registrarMembresia(datos) {
    return this.http.post(this.API_BACKEND + 'membresias/registrar', datos);
  }
  actualizarMembresia(id:number, datos:any): any {
    return this.http.put(this.API_BACKEND + 'membresias/actualizar/' +id, datos);
  }
  datosMembresia(id){
    return this.http.get(this.API_BACKEND + 'membresias/' + id);
  }
  listarMembresia(){
    return this.http.get(this.API_BACKEND + 'membresias');
  }
  admMembresia(){
    return this.http.get(this.API_BACKEND + 'membresias-administrar');
  }
  hablitarMembresia(id){
    return this.http.get(this.API_BACKEND + 'membresias/activar-desactivar/' + id);
  }
  eliminarMembresia(id){
    return this.http.get(this.API_BACKEND + 'membresias/eliminar/' + id);
  }
}
