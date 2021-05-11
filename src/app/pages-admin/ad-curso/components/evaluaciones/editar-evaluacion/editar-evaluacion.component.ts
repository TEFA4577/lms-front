import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
@Component({
  selector: 'app-editar-evaluacion',
  templateUrl: './editar-evaluacion.component.html',
  styleUrls: ['./editar-evaluacion.component.scss']
})
export class EditarEvaluacionComponent implements OnInit {

  formPrueba: FormGroup;
  datos: any;
  pruebas: any;
  id: number;
  constructor(
    public dialogRef: MatDialogRef<EditarEvaluacionComponent>,
    public formBuilder: FormBuilder,
    public serPrueba: EvaluacionService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(this.id);
  }
  ngOnInit(): void {
    this.buildForm();
    this.cargarDatosPrueba();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formPrueba = this.formBuilder.group({
      id_prueba: [this.id],
      texto_prueba: ['', Validators.required]
    });
  }
  setForm(): void {
    this.formPrueba.get('texto_prueba').setValue(this.pruebas.texto_prueba);
  }
  cargarDatosPrueba(): void {
    this.serPrueba.datosPrueba(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.pruebas = this.datos.prueba;
      this.setForm();
    }, error => {
      console.log(error);
    });
  }

  sumitPrueba(event): void {
    event.preventDefault();
    console.log(this.formPrueba.value);
    this.serPrueba.actualizarPrueba(this.formPrueba.value, this.id).subscribe(res => {
      console.log(res);
      this.formPrueba.reset();
      this.cargarDatosPrueba();
      this.onNoClick();
    });
  }

}
