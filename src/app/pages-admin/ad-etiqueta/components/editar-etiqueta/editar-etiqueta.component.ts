import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtiquetaService } from '../../../../services/etiqueta.service';

@Component({
  selector: 'app-editar-etiqueta',
  templateUrl: './editar-etiqueta.component.html',
  styleUrls: ['./editar-etiqueta.component.scss']
})
export class EditarEtiquetaComponent implements OnInit {
  formEtiqueta: FormGroup;
  imagenCambio: any;
  datos: any;
  id: number;
  files: any = [];
  filedata: any;
  constructor(
    public dialogRef: MatDialogRef<EditarEtiquetaComponent>,
    public formBuilder: FormBuilder,
    public serEtiqueta: EtiquetaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    console.log(data);
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
    this.formEtiqueta = this.formBuilder.group({
      nombre_etiqueta: ['', Validators.required],
      descripcion_etiqueta: ['', Validators.required],
    });
  }
  setForm(): void {
    this.formEtiqueta.get('nombre_etiqueta').setValue(this.datos.nombre_etiqueta);
    this.formEtiqueta.get('descripcion_etiqueta').setValue(this.datos.descripcion_etiqueta);
  }
  submitEtiqueta(event): void {
    event.preventDefault();
    console.log(this.formEtiqueta.value);
    this.serEtiqueta.actualizarEtiqueta(this.id, this.formEtiqueta).subscribe(res => {
      console.log(res);
      this.formEtiqueta.reset();
      this.cargarDatos();
    });
  }

  cambiarVideo(): void {
    const myFormData = new FormData();
    myFormData.append('id_etiqueta', this.id + '');
    myFormData.append('imagen_etiqueta', this.filedata);
    this.serEtiqueta.cambiarImagenEtiqueta(myFormData).subscribe(res => {
      console.log(res);
      this.cargarDatos();
      this.deleteAttachment(0);
    });
  }
  cargarDatos(): void {
    this.serEtiqueta.mostarEtiqueta(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.setForm();
    });
  }
  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.files.push(element.name);
      this.filedata = element;
      console.log(element);
      const reader = new FileReader();
      reader.readAsDataURL(event[index]);
      reader.onload = (_event) => {
        this.imagenCambio = reader.result;
      }
    }
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.imagenCambio = false;
  }

}
