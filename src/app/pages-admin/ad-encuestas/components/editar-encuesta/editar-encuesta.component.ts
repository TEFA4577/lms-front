import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncuestasService } from '../../../../services/encuestas.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-encuesta',
  templateUrl: './editar-encuesta.component.html',
  styleUrls: ['./editar-encuesta.component.scss']
})
export class EditarEncuestaComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  formTitulo: FormGroup;
  datos: any;
  id: number;
  encuesta: any;
  respuesta: any;

  constructor(
    public dialogRef: MatDialogRef<EditarEncuestaComponent>,
    public formBuilder: FormBuilder,
    public serEncuesta: EncuestasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formTitulo = this.formBuilder.group({
      id_encuesta: [this.id],
      texto_encuesta: ['', Validators.required]
    });
  }
  setForm(): void {
    this.formTitulo.get('texto_encuesta').setValue(this.encuesta.texto_encuesta);
  }

  submitTitulo(event): void {
    event.preventDefault();
    console.log(this.formTitulo.value);
    this.serEncuesta.actualizarEncuesta(this.formTitulo.value, this.id).subscribe(res => {
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
      this.formTitulo.reset();
      this.onNoClick();
    });
  }

}
