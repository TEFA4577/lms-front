import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-evaluacion-opcion',
  templateUrl: './crear-evaluacion-opcion.component.html',
  styleUrls: ['./crear-evaluacion-opcion.component.scss']
})
export class CrearEvaluacionOpcionComponent implements OnInit {
  formOpcion: FormGroup;
  datos: any;
  id: number;
  opcion: any;
  estadoCargando = false;
  isChecked = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialogRef: MatDialogRef<CrearEvaluacionOpcionComponent>,
    public formBuilder: FormBuilder,
    public serOpcion: EvaluacionService,
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
    this.formOpcion = this.formBuilder.group({
      texto_prueba_opcion: ['', Validators.required],
      respuesta_opcion: ['']
    });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submitOpcion(event): void {
    event.preventDefault();
    console.log(this.formOpcion.value);
    const myFormData = new FormData();
    myFormData.append('id_prueba', this.id + '');
    myFormData.append('texto_prueba_opcion', this.formOpcion.get('texto_prueba_opcion').value);
    myFormData.append('respuesta_opcion', this.formOpcion.get('respuesta_opcion').value);
//myFormData.append('respuesta_opcion', JSON.stringify(this.formOpcion.value));
    this.serOpcion.registrarOpcion(myFormData).subscribe(res => {
      this.opcion = res;
      this.openSnackBar(this.opcion.mensaje, 'cerrar');
      console.log(res);
      this.formOpcion.reset();
      this.onNoClick();
    });
  }
  cargarDatos(): void {
    this.serOpcion.datosPrueba(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
    });
  }

}
