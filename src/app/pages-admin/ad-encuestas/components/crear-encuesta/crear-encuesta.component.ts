import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EncuestasService } from '../../../../services/encuestas.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.scss']
})
export class CrearEncuestaComponent implements OnInit {

  formCrearEncuesta: FormGroup;
  datos: any;
  id: number;
  respuesta: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<CrearEncuestaComponent>,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public serEncuesta: EncuestasService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm(): void {
    this.formCrearEncuesta = this.formBuilder.group({
      texto_encuesta: ['', Validators.required]
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submitCrearEncuesta(event): void {
    event.preventDefault();
    console.log(this.formCrearEncuesta.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_rol;
    myFormData.append('id_rol', id);
    myFormData.append('texto_encuesta', this.formCrearEncuesta.get('texto_encuesta').value);


    this.serEncuesta.registrarEncuesta(myFormData).subscribe(res => {
      console.log(res);
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.formCrearEncuesta.reset();
      this.onNoClick();
    });
  }
}
