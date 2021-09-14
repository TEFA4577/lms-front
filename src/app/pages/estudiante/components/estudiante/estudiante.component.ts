import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { DocentesService } from '../../../../services/docentes.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
})
export class EstudianteComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;
  id: any;
  datos: any;
  datosUsuario: any;
  idUsuario: number;
  imgURL: any;
  formUsuario: FormGroup;
  formDocente: FormGroup;
  files: any = [];
  filedata: any;
  imagenPerfilCambio: any;
  isActive = false;
  estado = false;
  rutaVideo: string;

  constructor(
    public srvEstudiante: UsuarioService,
    public srvDocente: DocentesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE STORAGE.
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.comprobarAuth();
    this.buildForm();
    this.formBuild();
  }

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
        });
      }
    });
  }


  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      console.log(this.datosUsuario);
      this.estado = true;
    }
  }
  verVideo(ruta): void {
    this.rutaVideo = ruta;
  }
  setVideo(ruta: string) {
    this.rutaVideo = ruta;
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  buildForm(): void {
    this.formUsuario = this.formBuilder.group({
      nombre_usuario: ['', Validators.required],
      correo_usuario: ['', Validators.required],
    });
    this.setForm();
  }
  formBuild(): void {
    this.formDocente = this.formBuilder.group({
      telefono_docente: ['', Validators.required],
      descripcion_docente: ['', Validators.required],
      experiencia_docente: ['', Validators.required]
    });
    this.setData();
  }
  setForm(): void {
    this.formUsuario.get('nombre_usuario').setValue(this.datosUsuario.nombre_usuario);
    this.formUsuario.get('correo_usuario').setValue(this.datosUsuario.correo_usuario);
  }
  setData(): void {
    this.formDocente.get('telefono_docente').setValue(this.datosUsuario.datos_docente.telefono_docente);
    this.formDocente.get('descripcion_docente').setValue(this.datosUsuario.datos_docente.descripcion_docente);
    this.formDocente.get('experiencia_docente').setValue(this.datosUsuario.datos_docente.experiencia_docente);
  }
  submitEditarUsuario(event: Event): void {
    event.preventDefault();
    console.log(this.formUsuario.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('nombre_usuario', this.formUsuario.get('nombre_usuario').value);
    myFormData.append('correo_usuario', this.formUsuario.get('correo_usuario').value);
    Swal.fire({
      title: 'Datos de Perfil',
      text: '¿Seguro que desea actualizar los cambios realizados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvEstudiante.actualizarUsuario(myFormData, id).subscribe(res => {
          const obj: any = res;
          localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
          console.log(res);
          this.imagenPerfilCambio = null;
          this.respuesta = res;
          this.openSnackBar(this.respuesta.mensaje, 'cerrar');
          window.location.reload();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  actualizarFotoUsuario(event: Event): void {
    event.preventDefault();
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('foto_usuario', this.filedata);
    //myFormData.append('_method', 'put');
    Swal.fire({
      title: 'Datos de Perfil',
      text: '¿Seguro que desea actualizar su foto de perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvEstudiante.actualizarFotoUsuario(myFormData, id).subscribe(res => {
          const obj: any = res;
          localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
          console.log(res);
          this.imagenPerfilCambio = null;
          this.respuesta = res;
          this.openSnackBar(this.respuesta.mensaje, 'cerrar');
          window.location.reload();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  actualizarPerfilDocente(event: Event): void {
    event.preventDefault();
    console.log(this.formDocente.value);
    Swal.fire({
      title: 'Datos de Perfil',
      text: 'seguro que desea actualizar los cambios realizados!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvDocente.actualizarDocente(this.formDocente.value, this.datosUsuario.id_usuario).subscribe(res => {
          const obj: any = res;
          localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
          console.log(res);
          window.location.reload();
          this.respuesta = res;
          this.openSnackBar(this.respuesta.mensaje, 'cerrar');
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
