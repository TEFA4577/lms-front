import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { EtiquetaService } from '../../../services/etiqueta.service';
import { LoginService } from '../../../services/login.service';
import { MediaMatcher } from '@angular/cdk/layout';
FormsModule
// Dialog o modal
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule } from '@angular/forms';
import { RegistroDocenteComponent } from '../../../pages/docente/components/registro-docente/registro-docente.component';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input() deviceXs: boolean;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;
  mobileQuery: MediaQueryList;
  open = false;
  estado: boolean;
  datosUsuario: any;
  isActive = false;
  etiqueta: any;
  searchClass: any;
  curso: any;
  data: any;
  cursos = [];

  private mobileQueryListener: () => void;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginSrv: LoginService,
    private authSer: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService,
    private etiquetaService: EtiquetaService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.comprobarAuth();
  }

  ngOnInit(): void {
    this.cargarEtiquetas();
  }

  imagenError(): void {
    this.datosUsuario.foto_usuario = 'https://ui-avatars.com/api/?background=random&name=' + this.datosUsuario.nombre_usuario;
  }
  comprobarAuth(): void {
    this.estado = this.usuarioService.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    console.log(this.estado);
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
  cerrarSesion(): void {
    this.loginSrv.logoutUsuario().subscribe((res) => {
      console.log(res);
      localStorage.removeItem('datosUsuario');
      localStorage.removeItem('token');
      this.authSer.logout();
      this.router.navigateByUrl('');
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegistroDocenteComponent, {
      width: '1000vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('carga');
      this.comprobarAuth();
      window.location.reload();
    });
  }

  cargarEtiquetas() {
    this.etiquetaService.listarEtiquetas().subscribe(data => {
      console.log(data);
      this.etiqueta = data;
    });
  }
}

