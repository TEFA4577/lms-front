import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formEmail: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private serUsuario: UsuarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  respuesta: any;

  ngOnInit(): void {
    this.buildForm();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private buildForm(): void {
    this.formEmail = this.formBuilder.group({
      correo_usuario: ['', [Validators.required, Validators.email]]
    });
  }

  emailPass(event: Event): void {
    event.preventDefault();
    console.log(this.formEmail.value);
    this.submitEmailPass(this.formEmail.value);
  }

  submitEmailPass(datos: any) {
    this.serUsuario.sendMail(datos).subscribe(data => {
      console.log(data);
      this.respuesta = data;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
    }, error => {
      console.log(error);
    });
  }

}

