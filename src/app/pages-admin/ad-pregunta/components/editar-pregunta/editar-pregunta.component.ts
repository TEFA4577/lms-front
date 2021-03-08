import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaService } from '../../../../services/pregunta.service';

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
  constructor(
    public dialogRef: MatDialogRef<EditarPreguntaComponent>,
    public formBuilder: FormBuilder,
    public serPregunta: PreguntaService,
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

  submitEditarPregunta(event): void {
    event.preventDefault();
    console.log(this.formEditarPregunta.value);
    this.serPregunta.actualizarPregunta(this.formEditarPregunta.value, this.id).subscribe(res => {
      console.log(res);
      this.formEditarPregunta.reset();
      this.cargarDatosPregunta();
      this.onNoClick();
    });
  }

}
