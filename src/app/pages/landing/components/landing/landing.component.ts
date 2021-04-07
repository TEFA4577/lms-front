import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestasService } from '../../../../services/encuestas.service';
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

  constructor(
    public SerEncuestas: EncuestasService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar

    ) { }

  encuesta: any;

  ngOnInit(): void {
    this.listarEncuestas();
    this.buildForm();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private buildForm(): void {
    this.formRegistrarRespuesta = this.formBuilder.group({
      texto_respuesta_encuesta: ['', [Validators.required]],
    });
  }

  submitRegistrarRespuesta(event: Event): void {
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

  listarEncuestas(){
    this.SerEncuestas.listarPreguntasEncuestas().subscribe(data => {
      console.log(data);
      this.encuesta = data;
    });
  }

}
