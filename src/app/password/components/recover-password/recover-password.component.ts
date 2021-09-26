import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  formPassRecover: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private serUsuario: UsuarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  respuesta: any;
  hide = true;

  ngOnInit(): void {
    this.buildForm();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get passwordError() {
    return this.formPassRecover.get('password');
  }

  private buildForm(): void {
    this.formPassRecover = this.formBuilder.group({
      correo_usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  passRecover(event: Event): void {
    event.preventDefault();
    console.log(this.formPassRecover.value);
    this.submitEmailPass(this.formPassRecover.value);
  }

  submitEmailPass(datos: any) {
    this.serUsuario.resetPass(datos).subscribe(data => {
      console.log(data);
      this.respuesta = data;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
    });
  }

}
