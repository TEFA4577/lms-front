import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {PreguntaService } from '../../../../services/pregunta.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.scss']
})
export class CrearPreguntaComponent implements OnInit {
  formPregunta: FormGroup;
  datos: any;
  id: number;
  respuesta:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<CrearPreguntaComponent>,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public serPregunta: PreguntaService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formPregunta = this.formBuilder.group({
      texto_pregunta: ['', Validators.required]
    });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  submitPregunta(event): void {
    event.preventDefault();
    console.log(this.formPregunta.value);
    const myFormData = new FormData();
    myFormData.append('texto_pregunta', this.formPregunta.get('texto_pregunta').value);


    this.serPregunta.registrarPregunta(myFormData).subscribe(res => {
      console.log(res);
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.formPregunta.reset();
      this.onNoClick();
    });
  }
}
