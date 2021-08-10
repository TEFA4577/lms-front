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



  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formEmail = this.formBuilder.group({
      correo_usuario: ['', [Validators.required, Validators.email]]
    });
  }

  emailPass(event: Event): void{

  }

}
