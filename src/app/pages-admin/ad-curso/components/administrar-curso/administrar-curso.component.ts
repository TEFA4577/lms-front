import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { CrearModuloComponent } from '../modulos/crear-modulo/crear-modulo.component';
import { CrearClaseComponent } from '../clases/crear-clase/crear-clase.component';
import { RecursosComponent } from '../recursos/recursos.component';
import { EditarModuloComponent } from '../modulos/editar-modulo/editar-modulo.component';
import { EditarClaseComponent } from '../clases/editar-clase/editar-clase.component';
import { CrearEvaluacionComponent } from '../evaluaciones/crear-evaluacion/crear-evaluacion.component';
import { EditarEvaluacionComponent } from '../evaluaciones/editar-evaluacion/editar-evaluacion.component';
import { CrearEvaluacionOpcionComponent } from '../evaluacion-opciones/crear-evaluacion-opcion/crear-evaluacion-opcion.component';
import { EditarEvaluacionOpcionComponent } from '../evaluacion-opciones/editar-evaluacion-opcion/editar-evaluacion-opcion.component';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE
import Swal from 'sweetalert2';
import { title } from 'process';

@Component({
  selector: 'app-administrar-curso',
  templateUrl: './administrar-curso.component.html',
  styleUrls: ['./administrar-curso.component.scss']
})
export class AdministrarCursoComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  id: any;
  datos: any;
  curso: any;
  modulos: any;
  pruebas: any;
  files: any = [];
  filedata: any;
  formCurso: FormGroup;
  imagenCambio: any;
  rutaVideo: any;
  enviar: any;
  texto = true;

  constructor(
    public serCursos: CursosService,
    public serEvaluacion: EvaluacionService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE STORAGE.
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
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

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatosCurso();
  }
  cargarDatosCurso(): void {
    this.serCursos.presentacionCurso(this.id).subscribe(data => {
      this.datos = data;
      this.curso = this.datos.curso;
      this.modulos = this.datos.modulos;
      this.pruebas = this.datos.prueba;
      this.setForm();
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  buildForm(): void {
    this.formCurso = this.formBuilder.group({
      nombre_curso: ['', Validators.required],
      descripcion_curso: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }
  setForm(): void {
    this.formCurso.get('nombre_curso').setValue(this.curso.nombre_curso);
    this.formCurso.get('descripcion_curso').setValue(this.curso.descripcion_curso);
    this.formCurso.get('precio').setValue(this.curso.precio);
  }
  resetForm(): void {
    Swal.fire({
      title: 'Descartar Cambios?',
      text: 'seguro que desea descartas los cambios realizados!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.imagenCambio = null;
        this.setForm();
        Swal.fire(
          'Descartado!',
          '',
          'success'
        );
      }
    });
  }


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
    /*referencia.getDownloadURL().subscribe((URL) => {
      if (this.filedata!= '') {
        this.filedata='';
        this.filedata = URL;
      }else{
        this.filedata = URL;
      }

    });*/
    this.formCurso.get('imagen_curso').setValue('listo');
    //console.log('files:', this.files);
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
        this.imagenCambio = reader.result;
      };
    }
    this.formCurso.get('imagen_curso').setValue('listo');
    console.log(this.files);
    console.log(this.filedata);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.imagenCambio = false;
    this.formCurso.get('imagen_curso').setValue('');
  }

  actualizarCurso(event): void {
    event.preventDefault();
    const myFormData = new FormData();
    myFormData.append('_method', 'put');
    myFormData.append('imagen_curso', this.filedata);
    myFormData.append('nombre_curso', this.formCurso.get('nombre_curso').value);
    myFormData.append('descripcion_curso', this.formCurso.get('descripcion_curso').value);
    myFormData.append('precio', this.formCurso.get('precio').value);
    Swal.fire({
      title: 'Actualizar Datos?',
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
        this.serCursos.actualizarCurso(myFormData, this.curso.id_curso).subscribe(res => {
          console.log(res);
          this.imagenCambio = null;
          this.cargarDatosCurso();
          Swal.fire(
            'Guardado!',
            '',
            'success'
          );
        }, error => {
          console.log(error);
        });
      }
      //window.location.reload();
    });
  }
  crearModulo(id: number): void {
    const dialogRef = this.dialog.open(CrearModuloComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  editarModulo(id: number): void {
    const dialogRef = this.dialog.open(EditarModuloComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  borrarModulo(id: number): void {
    Swal.fire({
      title: 'Eliminar el Modulo?',
      text: 'seguro que desea eliminar el Modulo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serCursos.eliminarModulo(id).subscribe(res => {
          console.log(res);
          this.cargarDatosCurso();
        });
        Swal.fire(
          'Eliminado!',
          'El modulo y su contenido se elimino correctamente.',
          'success'
        );
      }
    });
  }
  crearClase(id: number): void {
    const dialogRef = this.dialog.open(CrearClaseComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  borrarClase(id: number): void {
    Swal.fire({
      title: 'Eliminar clase?',
      text: 'seguro que desea eliminar la clase!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serCursos.eliminarClase(id).subscribe(res => {
          console.log(res);
          this.cargarDatosCurso();
        });
        Swal.fire(
          'Eliminado!',
          'La Clase se elimino correctamente.',
          'success'
        );
      }
    });
  }
  editarClase(id: number): void {
    const dialogRef = this.dialog.open(EditarClaseComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  abrirRecurso(id: number): void {
    const dialogRef = this.dialog.open(RecursosComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  /*cambiarImagen(): void {
    const myFormData = new FormData();
    myFormData.append('id_curso', this.id + '');
    myFormData.append('imagen_curso', this.filedata);
    this.serCursos.cambiarImagenCurso(myFormData).subscribe(res => {
      console.log(res);
      this.deleteAttachment(0);
      this.cargarDatosCurso();
    });
  }*/
  verVideo(ruta): void {
    this.rutaVideo = ruta;
  }

  crearPrueba(id: number): void {
    const dialogRef = this.dialog.open(CrearEvaluacionComponent, {
      disableClose: true,
      data: id,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  editarPrueba(id: number): void {
    const dialogRef = this.dialog.open(EditarEvaluacionComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  borrarPrueba(id: number): void {
    Swal.fire({
      title: 'Eliminar el Prueba?',
      text: 'seguro que desea eliminar el Prueba!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serEvaluacion.eliminarPrueba(id).subscribe(res => {
          console.log(res);
          this.cargarDatosCurso();
        });
        Swal.fire(
          'Eliminado!',
          'La prueba y su contenido se elimino correctamente.',
          'success'
        );
      }
    });
  }
  crearOpcion(id: number): void {
    const dialogRef = this.dialog.open(CrearEvaluacionOpcionComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  editarOpcion(id: number): void {
    const dialogRef = this.dialog.open(EditarEvaluacionOpcionComponent, {

      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  borrarOpcion(id: number): void {
    Swal.fire({
      title: 'Eliminar opcion?',
      text: 'seguro que desea eliminar la opcion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serEvaluacion.eliminarOpcion(id).subscribe(res => {
          console.log(res);
          this.cargarDatosCurso();
        });
        Swal.fire(
          'Eliminado!',
          'La opcion se elimino correctamente.',
          'success'
        );
      }
    });
  }

  borrarCurso(id: number): void {
    Swal.fire({
      title: 'Eliminar Curso?',
      text: 'seguro que desea eliminar el Curso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serCursos.eliminarCurso(id).subscribe(res => {
          this.router.navigateByUrl('/admin/cursos');
          console.log(res);
        });
        Swal.fire(
          'Eliminado!',
          'El Curso se elimino correctamente.',
          'success'
        );
      }
    });
  }
  enviarARevision(): void {
    const datos = {
      id_curso: this.id,
      estado_curso: 'no revisado'
    };
    Swal.fire({
      title: 'Enviar el Curso a revision?',
      text: 'seguro que desea enviar el curso a revision!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo enviar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serCursos.cambiarEstadoCurso(datos).subscribe(res => {
          this.cargarDatosCurso();
          this.enviar = res
          Swal.fire({
            title: this.enviar.mensaje,
            icon: this.enviar.estado
          });
          if (this.enviar.estado == "success") {
            this.router.navigateByUrl('admin/cursos/mis-cursos');
          }
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
