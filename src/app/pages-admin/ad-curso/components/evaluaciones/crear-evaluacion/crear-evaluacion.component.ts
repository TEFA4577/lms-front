import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../../../../../services/cursos.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
@Component({
  selector: 'app-crear-evaluacion',
  templateUrl: './crear-evaluacion.component.html',
  styleUrls: ['./crear-evaluacion.component.scss']
})
export class CrearEvaluacionComponent implements OnInit {

  formPrueba: FormGroup;
  datos: any;
  pruebas: any;
  id: number;
  constructor(
    public dialogRef: MatDialogRef<CrearEvaluacionComponent>,
    public formBuilder: FormBuilder,
    public serCurso: CursosService,
    public serPrueba: EvaluacionService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
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
      id_curso: [this.id],
      texto_prueba: ['', Validators.required]
    });
  }
  cargarDatosPrueba(): void {
    this.serCurso.presentacionCurso(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.pruebas = this.datos.prueba;
    }, error => {
      console.log(error);
    });
  }

  sumitPrueba(event): void {
    event.preventDefault();
    console.log(this.formPrueba.value);
    this.serPrueba.registrarPrueba(this.formPrueba.value).subscribe(res => {
      console.log(res);
      this.formPrueba.reset();
      this.cargarDatosPrueba();
      this.onNoClick();
    });
  }

}
