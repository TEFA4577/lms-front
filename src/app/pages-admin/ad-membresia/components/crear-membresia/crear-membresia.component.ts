import { Component, OnInit } from '@angular/core';
import { MembresiaService } from 'src/app/services/membresia.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE


@Component({
  selector: 'app-crear-membresia',
  templateUrl: './crear-membresia.component.html',
  styleUrls: ['./crear-membresia.component.scss']
})
export class CrearMembresiaComponent implements OnInit {
  formCrearMembresia: FormGroup;
  files: any = [];
  filedata: any;
  imgURL: any;
  constructor(
    public dialogRef: MatDialogRef<CrearMembresiaComponent>,
    private formBuilder: FormBuilder,
    public membresiaSrv: MembresiaService,
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE STORAGE.
  ) { }

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
  public cambioArchivo(event): void {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
      console.log('nombreArchivo: ', this.nombreArchivo);
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
          this.filedata = URL;
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
    //this.formDocente.get('video_clase').setValue('listo');
    //console.log('files:', this.files);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formCrearMembresia = this.formBuilder.group({
      nombre_membresia: ['', Validators.required],
      texto_membresia: ['', Validators.required],
      precio_membresia: ['', Validators.required],
     // imagen_membresia: ['', Validators.required],
      duracion_membresia: ['', Validators.required]
    });
  }
  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.files.push(element.name);
      this.filedata = element;
      const reader = new FileReader();
      reader.readAsDataURL(event[index]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
    this.formCrearMembresia.get('imagen_membresia').setValue('listo');
  }
  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.formCrearMembresia.get('imagen_membresia').setValue('');
  }

  submitCrearMembresia(event: Event): void {
    event.preventDefault();
    console.log(this.formCrearMembresia.value);
    const myFormData = new FormData();
    myFormData.append('nombre_membresia', this.formCrearMembresia.get('nombre_membresia').value);
    myFormData.append('imagen_membresia', this.filedata);
    myFormData.append('texto_membresia', this.formCrearMembresia.get('texto_membresia').value);
    myFormData.append('precio_membresia', this.formCrearMembresia.get('precio_membresia').value);
    myFormData.append('duracion_membresia', this.formCrearMembresia.get('duracion_membresia').value);
    this.membresiaSrv.registrarMembresia(myFormData).subscribe(res => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
