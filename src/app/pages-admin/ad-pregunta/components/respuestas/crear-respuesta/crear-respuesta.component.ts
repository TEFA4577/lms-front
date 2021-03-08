import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-crear-respuesta',
  templateUrl: './crear-respuesta.component.html',
  styleUrls: ['./crear-respuesta.component.scss']
})
export class CrearRespuestaComponent implements OnInit {
  formRespuesta: FormGroup;
  datos: any;
  id: number;
  estadoCargando = false;
  constructor(
    public dialogRef: MatDialogRef<CrearRespuestaComponent>,
    public formBuilder: FormBuilder,
    public serPregunta: PreguntaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    //this.cargarDatos();
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formRespuesta = this.formBuilder.group({
      texto_respuesta_pregunta: ['', Validators.required],
    });
  }

  submitRespuestas(event): void {
    event.preventDefault();
    this.estadoCargando = true;
    console.log(this.formRespuesta.value);
    const myFormData = new FormData();
    myFormData.append('id_pregunta', this.id + '');
    myFormData.append('texto_respuesta_pregunta', this.formRespuesta.get('texto_respuesta_pregunta').value);
    this.serPregunta.registrarRespuesta(myFormData).subscribe(res => {
      console.log(res);
      this.formRespuesta.reset();
      this.onNoClick();
    });
  }
  /*cargarDatos(): void {
  this.serPregunta.datosPregunta(this.id).subscribe(res => {
  console.log(res);
  this.datos = res;
  });
}*/
}
