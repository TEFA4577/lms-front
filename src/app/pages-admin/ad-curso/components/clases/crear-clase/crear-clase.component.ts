import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE

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
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE STORAGE
    public dialogRef: MatDialogRef<CrearClaseComponent>,
    public formBuilder: FormBuilder,
    public serCurso: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
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
    let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      if (this.filedata!= '') {
        this.filedata='';
        this.filedata = URL;
      }else{
        this.filedata = URL;
      }

    });
    this.formClase.get('video_clase').setValue('listo');
    console.log('files:', this.files);
  }

  // FIN DE CODIGO

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
    console.log('submit: ',this.formClase.value);
    console.log('filedata: ', this.filedata);
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
    console.log(this.filedata);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.formClase.get('video_clase').setValue('');
  }

}
