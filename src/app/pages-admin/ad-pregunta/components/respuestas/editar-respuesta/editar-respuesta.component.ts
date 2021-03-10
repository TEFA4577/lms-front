import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-editar-respuesta',
  templateUrl: './editar-respuesta.component.html',
  styleUrls: ['./editar-respuesta.component.scss']
})
export class EditarRespuestaComponent implements OnInit {
  formEditarRespuesta: FormGroup
  datos: any;
  id: number;
  respuestas: any;

  constructor(
    public dialogRef: MatDialogRef<EditarRespuestaComponent>,
    public formBuilder: FormBuilder,
    public serPregunta: PreguntaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatosRespuesta();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formEditarRespuesta = this.formBuilder.group({
      id_respuesta_pregunta: [this.id],
      texto_respuesta_pregunta: ['', Validators.required],
    });
  }
  setForm(): void {
    this.formEditarRespuesta.get('texto_respuesta_pregunta').setValue(this.datos.texto_respuesta_pregunta);
  }
  cargarDatosRespuesta(): void{
    this.serPregunta.datosRespuesta(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.respuestas = this.datos.respuestas;
      this.setForm();
    }, error => {
      console.log(error);
    });
  }
  submitEditarRespuesta(event): void {
    event.preventDefault();
    console.log(this.formEditarRespuesta.value);
    this.serPregunta.actualizarRespuesta(this.id, this.formEditarRespuesta.value).subscribe(res => {
      console.log(res);
      this.formEditarRespuesta.reset();
      this.cargarDatosRespuesta();
      this.onNoClick();
    });
  }

}
