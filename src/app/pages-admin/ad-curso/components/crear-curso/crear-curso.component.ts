import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss']
})
export class CrearCursoComponent implements OnInit {
  formCrearCurso: FormGroup;
  files: any = [];
  filedata: any;
  imgURL: any;
  constructor(
    public dialogRef: MatDialogRef<CrearCursoComponent>,
    private formBuilder: FormBuilder,
    public cursoSrv: CursosService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formCrearCurso = this.formBuilder.group({
      nombre_curso: ['', Validators.required],
      descripcion_curso: ['', Validators.required],
      precio_curso: ['', Validators.required],
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
        this.imgURL = reader.result;
      };
    }
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
  }
  submitRegistrarCurso(event: Event): void {
    event.preventDefault();
    console.log(this.formCrearCurso.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('imagen_curso', this.filedata);
    myFormData.append('nombre_curso', this.formCrearCurso.get('nombre_curso').value);
    myFormData.append('descripcion_curso', this.formCrearCurso.get('descripcion_curso').value);
    myFormData.append('precio', this.formCrearCurso.get('precio_curso').value);
    this.cursoSrv.registrarCurso(myFormData).subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }
}
