import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EtiquetaService } from '../../../../services/etiqueta.service';

@Component({
  selector: 'app-crear-etiqueta',
  templateUrl: './crear-etiqueta.component.html',
  styleUrls: ['./crear-etiqueta.component.scss']
})
export class CrearEtiquetaComponent implements OnInit {

  formEtiqueta: FormGroup;
  datos: any;
  id: number;
  files: any = [];
  filedata: any;
  constructor(
    public dialogRef: MatDialogRef<CrearEtiquetaComponent>,
    public formBuilder: FormBuilder,
    public serEtiqueta: EtiquetaService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formEtiqueta = this.formBuilder.group({
      nombre_etiqueta: ['', Validators.required],
      descripcion_etiqueta: ['', Validators.required],
      imagen_etiqueta: ['', Validators.required]
    });
  }

  submitEtiqueta(event): void {
    event.preventDefault();
    console.log(this.formEtiqueta.value);
    const myFormData = new FormData();
    myFormData.append('imagen_etiqueta', this.filedata);
    myFormData.append('nombre_etiqueta', this.formEtiqueta.get('nombre_etiqueta').value);
    myFormData.append('descripcion_etiqueta', this.formEtiqueta.get('descripcion_etiqueta').value);

    this.serEtiqueta.registrarEtiqueta(myFormData).subscribe(res => {
      console.log(res);
      this.formEtiqueta.reset();
      this.onNoClick();
    });
  }
  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.files.push(element.name);
      this.filedata = element;
      console.log(element);
    }
    this.formEtiqueta.get('imagen_etiqueta').setValue('listo');
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.formEtiqueta.get('imagen_etiqueta').setValue('');
  }

}
