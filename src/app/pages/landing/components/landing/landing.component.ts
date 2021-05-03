import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestasService } from '../../../../services/encuestas.service';
import { UsuarioService } from '../../../../services/usuario.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  formRegistrarRespuesta: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;
  datosUsuario: any;
  estado: boolean;
  encuesta: any;

  constructor(
    public SerEncuestas: EncuestasService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,

  ) { }

  ngOnInit(): void {
    this.listarEncuestas();
    this.buildForm();
    this.comprobarAuth();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private buildForm(): void {
    this.formRegistrarRespuesta = this.formBuilder.group({
    });
  }

  submitRegistrar(event: Event): void {
    event.preventDefault();
    console.log(this.formRegistrarRespuesta.value);
    this.registrarDatos(this.formRegistrarRespuesta.value);
  }

  registrarDatos(datos: any) {
    this.SerEncuestas.registrarRespuesta(datos).subscribe(data => {
      console.log(data);
      this.respuesta = data;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
    }, error => {
      console.log(error);
    });
  }

  comprobarAuth(): void {
    this.estado = this.usuarioService.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    console.log(this.estado);
  }

  listarEncuestas() {
    this.SerEncuestas.listarEncuestas().subscribe(data => {
      console.log(data);
      this.encuesta = data;
    });
  }

}
