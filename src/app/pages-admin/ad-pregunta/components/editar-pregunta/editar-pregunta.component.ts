import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaService } from '../../../../services/pregunta.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
  styleUrls: ['./editar-pregunta.component.scss']
})
export class EditarPreguntaComponent implements OnInit {
  formEditarPregunta: FormGroup;
  datos: any;
  preguntas: any;
  id: number;
  respuesta:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialogRef: MatDialogRef<EditarPreguntaComponent>,
    public formBuilder: FormBuilder,
    public serPregunta: PreguntaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(this.id);
  }
  ngOnInit(): void {
    this.buildForm();
    this.cargarDatosPregunta();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formEditarPregunta = this.formBuilder.group({
      id_pregunta: [this.id],
      texto_pregunta: ['', Validators.required]
    });
  }
  setForm(): void {
    this.formEditarPregunta.get('texto_pregunta').setValue(this.datos.texto_pregunta);
  }
  cargarDatosPregunta(): void {
    this.serPregunta.datosPregunta(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.preguntas = this.datos.preguntas;
      this.setForm();
    }, error => {
      console.log(error);
    });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  submitEditarPregunta(event): void {
    event.preventDefault();
    console.log(this.formEditarPregunta.value);
    this.serPregunta.actualizarPregunta( this.id, this.formEditarPregunta.value).subscribe(res => {
      console.log(res);
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.formEditarPregunta.reset();
      this.cargarDatosPregunta();
      this.onNoClick();
    });
  }

}
