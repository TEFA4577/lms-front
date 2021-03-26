import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<CrearEncuestaComponent>,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm(): void {
    this.formCrearEncuesta = this.formBuilder.group({
      texto_pregunta: ['', Validators.required]
    });
  }

  submitCrearEncuesta(event): void {
  }

}
