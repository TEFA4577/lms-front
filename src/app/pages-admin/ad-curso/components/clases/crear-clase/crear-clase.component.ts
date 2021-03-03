import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.scss']
})
export class CrearClaseComponent implements OnInit {
  formClase: FormGroup;
  datos: any;
  id: number;
  files: any = [];
  filedata: any;
  videoURL: any;
  estadoCargando = false;
  constructor(
    public dialogRef: MatDialogRef<CrearClaseComponent>,
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
      video_clase: ['', Validators.required]
    });
  }

  submitClases(event): void {
    event.preventDefault();
    this.estadoCargando = true;
    console.log(this.formClase.value);
    const myFormData = new FormData();
    myFormData.append('id_modulo', this.id + '');
    myFormData.append('video_clase', this.filedata);
    myFormData.append('titulo_clase', this.formClase.get('titulo_clase').value);
    myFormData.append('descripcion_clase', this.formClase.get('descripcion_clase').value);

    this.serCurso.registrarClase(myFormData).subscribe(res => {
      console.log(res);
      this.estadoCargando = false;
      this.formClase.reset();
      this.onNoClick();
    });
  }
  cargarDatos(): void {
    this.serCurso.datosModulo(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
    });
  }
  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      console.log(element.size * 1e-9);
      this.files.push(element.name);
      this.filedata = element;
      var reader = new FileReader();
      reader.readAsDataURL(event[index]);
      reader.onload = (_event) => {
        this.videoURL = reader.result;
      }
      console.log(element);
    }
    this.formClase.get('video_clase').setValue('listo');
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.formClase.get('video_clase').setValue('');
  }

}
