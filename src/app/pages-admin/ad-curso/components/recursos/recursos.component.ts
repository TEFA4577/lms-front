import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE
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
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE STORAGE
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

  // CODIGO PARA FIREBASE STORAGE
  public archivoForm = new FormGroup({
    archivo: new FormControl('', Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

    //Evento que se gatilla cuando el input de tipo archivo cambia
    public cambioArchivo(event):void {
      if (event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
          this.nombreArchivo = event.target.files[i].name;
          this.datosFormulario.delete('archivo');
          this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
          }
    } else {
        this.mensajeArchivo = 'No hay un archivo seleccionado';
      }
    }

    //Sube el archivo a Cloud Storage
    public subirArchivo() {
      let archivo = this.datosFormulario.get('archivo');
      //let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
      let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
      //Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje == 100) {
          this.finalizado = true;
          let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
          referencia.getDownloadURL().subscribe((URL) => {
            this.filedata= URL;
            console.log('FILEDATA:', this.filedata);

          })
        }
      });

      /*referencia.getDownloadURL().subscribe((URL) => {
        if (this.filedata!= '') {
          this.filedata='';
          this.filedata = URL;
        }else{
          this.filedata = URL;
        }

      });*/
      //this.formClase.get('video_clase').setValue('listo');
      //console.log('files:', this.files);
    }

    // FIN DE CODIGO

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
