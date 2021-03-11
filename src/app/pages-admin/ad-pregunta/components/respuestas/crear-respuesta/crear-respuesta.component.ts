import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaService } from 'src/app/services/pregunta.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-respuesta',
  templateUrl: './crear-respuesta.component.html',
  styleUrls: ['./crear-respuesta.component.scss']
})
export class CrearRespuestaComponent implements OnInit {
  formRespuesta: FormGroup;
  datos: any;
  id: number;
  respuesta:any;
  estadoCargando = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialogRef: MatDialogRef<CrearRespuestaComponent>,
    public formBuilder: FormBuilder,
    public serPregunta: PreguntaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.cargarDatos();
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formRespuesta = this.formBuilder.group({
      texto_respuesta_pregunta: ['', Validators.required],
    });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  submitRespuestas(event): void {
    event.preventDefault();
    this.estadoCargando = true;
    console.log(this.formRespuesta.value);
    const myFormData = new FormData();
    myFormData.append('id_pregunta', this.id + '');
    myFormData.append('texto_respuesta_pregunta', this.formRespuesta.get('texto_respuesta_pregunta').value);
    this.serPregunta.registrarRespuesta(myFormData).subscribe(res => {
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
      this.formRespuesta.reset();
      this.onNoClick();
    });
  }
  cargarDatos(): void {
    this.serPregunta.datosPregunta(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
    });
  }
}
