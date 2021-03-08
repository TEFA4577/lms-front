import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {PreguntaService } from '../../../../services/pregunta.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.scss']
})
export class CrearPreguntaComponent implements OnInit {
  formPregunta: FormGroup;
  datos: any;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<CrearPreguntaComponent>,
    public formBuilder: FormBuilder,
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
  submitPregunta(event): void {
    event.preventDefault();
    console.log(this.formPregunta.value);
    const myFormData = new FormData();
    myFormData.append('texto_pregunta', this.formPregunta.get('texto_pregunta').value);

    this.serPregunta.registrarPregunta(myFormData).subscribe(res => {
      console.log(res);
      this.formPregunta.reset();
      this.onNoClick();
    });
  }
}
