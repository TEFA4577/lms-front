import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DocentesService } from 'src/app/services/docentes.service';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.scss']
})
export class RegistroDocenteComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;

  formDocente: FormGroup;
  formClase: FormGroup;
  docente: any;
  estado = false;
  datosUsuario: any;
  isActive = false;

  filesVideo: any = [];
  videoURL: any;
  filedataV: any;
  filedata: any;
  filesCV: any = [];
  filedataCV: any;
  path: String;
  video: any;

  constructor(
    public docenteAd: DocentesService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegistroDocenteComponent>,
    private usuarioService: UsuarioService,
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE STORAGE.
    private af: AngularFireStorage,
    public route: ActivatedRoute) { }


  // tslint:disable-next-line: typedef

  //CODIGO PARA FIREBASE STORAGE
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

  upload(event) {
    this.path = event.target.files[0]

    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
      }
      console.log('nombreArchivo: ', this.nombreArchivo);

    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
      let archivo = this.datosFormulario.get('archivo');

      let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
      //Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje == 100) {
          this.finalizado = true;
          let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
          console.log('referencia: ', referencia);
          referencia.getDownloadURL().subscribe((URL) => {
            console.log('url: ', URL);
            this.URLPublica=URL;
            console.log('URLPublica: ', this.URLPublica);

          })
        }
        console.log("Porcentaje: ", this.porcentaje);
      });
      this.formClase.get('video_clase').setValue('listo');
  }

  uploadImage() {
    console.log(this.path);


    //let archivo = this.datosFormulario.get('video_instructor');
    this.af.upload("files" + Math.random() + this.path, this.path);
    let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    //let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    //Cambia el porcentaje
    /*tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });*/

    referencia.getDownloadURL().subscribe((URL) => {
      /*if (this.filedata != '') {
        this.filedata = '';
        this.filedata = URL;
      } else {
        this.filedata = URL;
      }*/
      this.URLPublica = URL;
      console.log(this.URLPublica);
    });


  }

  ngOnInit(): void {
    this.buildForm();
    this.comprobarAuth();
  }
  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      this.estado = true;
      console.log(this.datosUsuario);
    }
  }
  // tslint:disable-next-line: typedef
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formDocente = this.formBuilder.group({
      telefono_docente: ['', [Validators.required, Validators.maxLength(8)]],
      experiencia_docente: ['', [Validators.required, Validators.maxLength(80)]],
      descripcion_docente: ['', [Validators.required, Validators.maxLength(500)]],
      video_instructor: [''],
      CV: [''],
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      console.log(element.size * 1e-9);
      this.filesVideo.push(element.name);
      this.filedataV = element;
      const reader = new FileReader();
      reader.readAsDataURL(event[index]);
      reader.onload = (_event) => {
        this.videoURL = reader.result;
      };
      console.log(element);
    }
    this.formDocente.get('video_instructor').setValue('listo');
    console.log(this.filesVideo);
  }

  deleteAttachment(index): void {
    this.filesVideo.splice(index, 1);
    this.formDocente.get('video_instructor').setValue('');
  }

  uploadFileCV(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.filesCV.push(element.name);
      this.filedataCV = element;
      console.log(element);
    }
    console.log(this.filesCV);
  }
  deleteAttachmentCV(index): void {
    this.filesCV.splice(index, 1);
  }
  submitRegistrarDocente(event: Event): void {
    event.preventDefault();
    this.isActive = true;
    console.log(this.formDocente.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('telefono_docente', this.formDocente.get('telefono_docente').value);
    myFormData.append('experiencia_docente', this.formDocente.get('experiencia_docente').value);
    myFormData.append('descripcion_docente', this.formDocente.get('descripcion_docente').value);
    myFormData.append('video_instructor', this.URLPublica);
    myFormData.append('CV', this.video);
    Swal.fire({
      title: 'Seguro que quiere mandar su solicitud?',
      showDenyButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.docenteAd.registrarDocente(myFormData).subscribe(res => {
          const estad = this.usuarioService.estadoSession;
          console.log(res);
          this.respuesta = res;
          Swal.fire('Enviado!', '', 'success').finally(() => {
            this.onNoClick();
            this.isActive = false;
          });
          this.openSnackBar(this.respuesta.mensaje, 'cerrar');
        }, error => {
          console.log(error);
        });
      } else if (result.isDenied) {
        Swal.fire('No se envió su solicitud', '', 'info').finally(() => this.isActive = false);
      }
    });
  }
}
