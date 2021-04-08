import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncuestasService } from '../../../../services/encuestas.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.scss']
})
export class CrearPreguntasComponent implements OnInit {

  formPregunta: FormGroup
  datos: any;
  id: number;
  respuesta: any;
  estadoCargando = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<CrearPreguntasComponent>,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private serEncuesta: EncuestasService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatos();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formPregunta = this.formBuilder.group({
      texto_encuesta_pregunta: ['', Validators.required]
    });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submitPregunta(event): void {
    event.preventDefault();
    this.estadoCargando = true;
    console.log(this.formPregunta.value);
    const myFormData = new FormData();
    myFormData.append('id_encuesta', this.id + '');
    myFormData.append('texto_encuesta_pregunta', this.formPregunta.get('texto_encuesta_pregunta').value);
    this.serEncuesta.registrarPregunta(myFormData).subscribe(res => {
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
      this.formPregunta.reset();
      this.onNoClick();
    });
  }

  cargarDatos(): void {
    this.serEncuesta.listarPreguntasEncuestas().subscribe(res => {
      console.log(res);
      this.datos = res;
    });
  }

}
