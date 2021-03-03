/**
 * Descripcion: Archivo TS para el componente de registro.
 * Autor: Alex Aguilar
 */
// importacion de modulos, clases y servicios
import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { LoginService } from '../services/login.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // declaracion de variables globales del componente
  hide = true;
  respuesta: any;
  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  usuario = {
    nombre_usuario: '',
    correo_usuario: '',
    password: '',
    foto: ''
  };
  // inyeccion de servicios
  constructor(
    public serRegistro: RegistroService,
    public serUsuario: UsuarioService,
    public serLogin: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authSrv: AuthService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  /**
   * Descripcion: esta funcion crea el formulario reactivo con las validaciones necesarias
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      nombre_usuario: ['', [Validators.required, Validators.minLength(4)]],
      correo_usuario: ['', [Validators.required, Validators.email]],
      foto: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  /**
   * Descripcion: esta funcion se ejecuta a enviar los datos por el formulario
   * parametro: event
   */
  submitRegistrar(event: Event): void {
    event.preventDefault();
    console.log(this.form.value);
    this.registrarDatos(this.form.value);
  }
  /**
   * Descripcion: Esta funcion abre un snarkBar con un mensaje y una accion
   * parametro: message
   * parametro: action
   */
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  /**
   * Descripcion: Esta funcion abre la ventana popup de Google
   */
  // tslint:disable-next-line: typedef
  abrirRegistro(opcion: string) {
    this.authSrv.registroConFirebase(opcion).then((datos) => {
      this.usuario.nombre_usuario = datos.user.displayName;
      this.usuario.correo_usuario = datos.user.email;
      this.usuario.foto = datos.user.photoURL;
      this.usuario.password = datos.user.uid;
      this.registrarDatos(this.usuario);
    });
  }
  /**
   * Descripcion: Esta funcion registra los datos del usuario y los manda al Backend
   * Servicio: RegistroService
   */
  // tslint:disable-next-line: typedef
  registrarDatos(datos: any) {
    this.serRegistro.registrarUsuario(datos).subscribe(data => {
      console.log(data);
      this.respuesta = data;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.login();
    }, error => {
      console.log(error);
    });
  }
  /**
   * Descripcion: Esta funcion realiza el inicio de session en el sistema y guarda los datos del usuario y su token
   */
  login(): void {
    const usr = {
      correo_usuario: this.form.get('correo_usuario').value,
      password: this.form.get('password').value,
    }
    console.log(usr);
    this.serLogin.loginUsuario(usr).subscribe(res => {
      this.respuesta = res;
      console.log(res);
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.serUsuario.guardarDatosUsuario(this.respuesta.usuario);
      this.serUsuario.guardarToken(this.respuesta.token);
      this.router.navigateByUrl('inicio');
    });
  }
  /**
   * Descripcion: las siguientes funciones obtienen los metodos de los inputs del formulario reactivo
   */
  // tslint:disable-next-line: typedef
  get correoError() {
    return this.form.get('correo_usuario');
  }
  // tslint:disable-next-line: typedef
  get nombreError() {
    return this.form.get('nombre_usuario');
  }
  // tslint:disable-next-line: typedef
  get passwordError() {
    return this.form.get('password');
  }
}
