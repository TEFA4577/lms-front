import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MENU_ADMIN, MENU_DOCENTE } from './menu';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  menuAdmin = MENU_ADMIN;
  menuDocente = MENU_DOCENTE;
  mobileQuery: MediaQueryList;
  open = false;
  datosUsuario: any;
  private mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginSrv: LoginService,
    private authSer: AuthService,
    public route: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }
  ngOnInit(): void {
    this.comprobarAuth();
  }

  imagenError(): void {
    this.datosUsuario.foto_usuario = 'https://ui-avatars.com/api/?background=random&name=' + this.datosUsuario.nombre_usuario;
  }
  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
  }

  cerrarSesion(): void {
    this.loginSrv.logoutUsuario().subscribe((res) => {
      console.log(res);
      localStorage.removeItem('datosUsuario');
      localStorage.removeItem('token');
      this.authSer.logout();
      this.route.navigateByUrl('');
    });
  }
}
