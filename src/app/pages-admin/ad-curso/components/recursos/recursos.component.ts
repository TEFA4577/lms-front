import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {
  formRecurso: FormGroup;
  datos: any;
  id: number;
  files: any = [];
  filedata: any;
  estadoCargando = false;
  constructor(
    public dialogRef: MatDialogRef<RecursosComponent>,
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
    this.formRecurso = this.formBuilder.group({
      nombre_recurso: ['', Validators.required],
    });
  }

  submitRecurso(event): void {
    event.preventDefault();
    this.estadoCargando = !this.estadoCargando;
    console.log(this.formRecurso.value);
    const myFormData = new FormData();
    myFormData.append('id_clase', this.id + '');
    myFormData.append('link_recurso', this.filedata);
    myFormData.append('nombre_recurso', this.formRecurso.get('nombre_recurso').value);
    this.serCurso.registarRecurso(myFormData).subscribe(res => {
      console.log(res);
      this.formRecurso.reset();
      this.estadoCargando = !this.estadoCargando;
      this.deleteAttachment(0);
      this.filedata = '';
      this.cargarDatos();
    });
  }
  cargarDatos(): void {
    this.serCurso.datosClase(this.id).subscribe(res => {
      console.log(res);
      console.log(this.id);
      this.datos = res;
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
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
  }
  borrarRecurso(id): void {
    Swal.fire({
      title: 'Eliminar Recurso?',
      text: 'seguro que desea eliminar el Recurso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.estadoCargando = !this.estadoCargando;
        this.serCurso.eliminarRecurso(id).subscribe(res => {
          console.log(res);
          this.estadoCargando = !this.estadoCargando;
          this.cargarDatos();
        });
        Swal.fire(
          'Eliminado!',
          'El Recurso se elimino correctamente.',
          'success'
        );
      }
    });
  }
}
