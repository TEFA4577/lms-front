import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaService } from '../../../../../services/pregunta.service';

@Component({
  selector: 'app-editar-respuesta',
  templateUrl: './editar-respuesta.component.html',
  styleUrls: ['./editar-respuesta.component.scss']
})
export class EditarRespuestaComponent implements OnInit {
  formEditarRespuesta: FormGroup
  datos: any;
  id: number;

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
  /*setForm(): void {
    this.formEditarRespuesta.get('texto_respuesta_pregunta').setValue(this.modulos.nombre_modulo);
  }
  /*cargarRespuesta(): void {
    this.serPregunta.datosRespuesta(this.id).subscribe(
      arg => this.property = arg);

  }*/

}
