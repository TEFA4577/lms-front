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
  selector: 'app-editar-respuesta',
  templateUrl: './editar-respuesta.component.html',
  styleUrls: ['./editar-respuesta.component.scss']
})
export class EditarRespuestaComponent implements OnInit {
  formEditarRespuesta: FormGroup
  datos: any;
  id: number;
  respuestas: any;
  respuesta:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<EditarRespuestaComponent>,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public serPregunta: PreguntaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    //console.log(this.id);
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatos();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  buildForm(): void {
    this.formEditarRespuesta = this.formBuilder.group({
      //id_respuesta_pregunta: [this.id],
      texto_respuesta_pregunta: ['', Validators.required],
    });
  }
  setForm(): void {
    this.formEditarRespuesta.get('texto_respuesta_pregunta').setValue(this.respuestas.texto_respuesta_pregunta);
  }
  cargarDatos(): void{
    this.serPregunta.datosRespuesta(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.respuestas = this.datos;
      this.setForm();
    }, error => {
      console.log(error);
    });
  }
  submitEditarRespuesta(event): void {
    event.preventDefault();
    console.log(this.formEditarRespuesta.value);
    this.serPregunta.actualizarRespuesta(this.id, this.formEditarRespuesta.value).subscribe(res => {
      console.log(res);
      this.formEditarRespuesta.reset();
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.cargarDatos();
      this.onNoClick();
    });
  }

}
