import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from '../../../../../services/cursos.service';
@Component({
  selector: 'app-editar-clase',
  templateUrl: './editar-clase.component.html',
  styleUrls: ['./editar-clase.component.scss']
})
export class EditarClaseComponent implements OnInit {
  formClase: FormGroup;
  estadoVideo = false;
  datos: any;
  id: number;
  files: any = [];
  filedata: any;
  constructor(
    public dialogRef: MatDialogRef<EditarClaseComponent>,
    public formBuilder: FormBuilder,
    public serCurso: CursosService,
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
    this.formClase = this.formBuilder.group({
      titulo_clase: ['', Validators.required],
      descripcion_clase: ['', Validators.required],
    });
  }
  setForm(): void {
    this.formClase.get('titulo_cltase').setValue(this.datos.clase.titulo_clase);
    this.formClase.get('descripcion_clase').setValue(this.datos.clase.descripcion_clase);
  }
  submitClases(event): void {
    event.preventDefault();
    console.log(this.formClase.value);
    this.serCurso.actualizarClase(this.formClase, this.id).subscribe(res => {
      console.log(res);
      this.formClase.reset();
      this.cargarDatos();
    });
  }

  cambiarVideo(): void {
    const myFormData = new FormData();
    myFormData.append('id_clase', this.id + '');
    myFormData.append('video_clase', this.filedata);
    this.serCurso.cambiarVideoClase(myFormData).subscribe(res => {
      console.log(res);
      this.cargarDatos();
      this.deleteAttachment(0);
    });
  }
  cargarDatos(): void {
    this.serCurso.datosClase(this.id).subscribe(res => {
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
      this.estadoVideo = true;
      console.log(element);
    }
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.estadoVideo = false;
  }

}
