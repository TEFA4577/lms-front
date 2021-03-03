import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() { }
  /**
   * Descripcion: el interceptor se encarga de colocar los headers a las consultas http y tambien el token de seguridad si existe
   * @author: @AlexAguilarP
   */

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        ContentType: 'application/json'
      }
    });
    return next.handle(request);
  }
}
