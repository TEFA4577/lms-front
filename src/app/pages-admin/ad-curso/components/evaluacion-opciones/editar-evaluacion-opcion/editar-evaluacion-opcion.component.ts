import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
@Component({
  selector: 'app-editar-evaluacion-opcion',
  templateUrl: './editar-evaluacion-opcion.component.html',
  styleUrls: ['./editar-evaluacion-opcion.component.scss']
})
export class EditarEvaluacionOpcionComponent implements OnInit {
  formOpcion: FormGroup;
  datos: any;
  isChecked = false;
  id: number;
  constructor(
    public dialogRef: MatDialogRef<EditarEvaluacionOpcionComponent>,
    public formBuilder: FormBuilder,
    public serOpcion: EvaluacionService,
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
      respuesta_opcion: ''
    }, error => console.log(error));
  }
  setForm(): void {
    this.formOpcion.get('texto_prueba_opcion').setValue(this.datos.texto_prueba_opcion);
    this.formOpcion.get('respuesta_opcion').setValue(this.datos.respuesta_opcion);
  }
  submitOpcion(event): void {
    event.preventDefault();
    console.log(this.formOpcion.value);
    this.serOpcion.actualizarOpcion(this.formOpcion.value, this.id).subscribe(res => {
      console.log(res);
      this.formOpcion.reset();
      this.onNoClick();
      this.cargarDatos();
    });
  }


  cargarDatos(): void {
    this.serOpcion.datosOpcion(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.setForm();
    });
  }
}
