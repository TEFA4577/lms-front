import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  API_BACKEND = environment.urlBackend;
  constructor(public http: HttpClient) { }
}
