import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;
  usuario = {
    correo_usuario: '',
    password: ''
  };
  constructor(
    private serLogin: LoginService,
    private serUsuario: UsuarioService,
    private authSrv: AuthService,
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/img/Iconos/Google__G__Logo.svg'));
  }

  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      correo_usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ingresoLogin(event: Event): void {
    event.preventDefault();
    this.login(this.form.value);
  }

  /**
   * Descripcion: Esta funcion abre la ventana popup de Google
   */
  // tslint:disable-next-line: typedef
  abrirRegistro(opcion: string) {
    this.authSrv.registroConFirebase(opcion).then((datos) => {
      this.usuario.correo_usuario = datos.user.email;
      this.usuario.password = datos.user.uid;
      this.login(this.usuario);
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  /**
   * Descripcion: Esta funcion realiza el inicio de session en el sistema y guarda los datos del usuario y su token
   */
  login(datos: any): void {
    this.serLogin.loginUsuario(datos).subscribe(res => {
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
      if (this.respuesta.mensaje === 'usuario no registrado') {
        console.log(res);
      } else {
        this.serUsuario.guardarDatosUsuario(this.respuesta.usuario);
        this.serUsuario.guardarToken(this.respuesta.token);
        this.router.navigateByUrl('inicio');
      }
    }, e => console.log(e));
  }


}

