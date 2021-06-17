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
    public route: ActivatedRoute) { }
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

  // FIN DE CODIGO

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

  submitRegistrarDocente(event: Event): void {
    event.preventDefault();
    this.isActive = true;
    console.log('submit: ', this.formDocente.value);
    console.log('filedata: ', this.filedata);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('video_presentacion', this.filedata);
    myFormData.append('telefono_docente', this.formDocente.get('telefono_docente').value);
    myFormData.append('experiencia_docente', this.formDocente.get('experiencia_docente').value);
    myFormData.append('descripcion_docente', this.formDocente.get('descripcion_docente').value);
    myFormData.append('CV', this.filedataCV);
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

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  deleteAttachment(index): void {
    this.filesVideo.splice(index, 1);
    this.formDocente.get('CV').setValue('');
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
}
