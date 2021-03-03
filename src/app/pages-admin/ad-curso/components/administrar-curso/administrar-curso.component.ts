import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { CrearModuloComponent } from '../modulos/crear-modulo/crear-modulo.component';
import { CrearClaseComponent } from '../clases/crear-clase/crear-clase.component';
import { RecursosComponent } from '../recursos/recursos.component';
import { EditarModuloComponent } from '../modulos/editar-modulo/editar-modulo.component';
import { EditarClaseComponent } from '../clases/editar-clase/editar-clase.component';
import Swal from 'sweetalert2';

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
  files: any = [];
  filedata: any;
  formCurso: FormGroup;
  imagenCambio: any;
  rutaVideo: any;
  constructor(
    public serCursos: CursosService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatosCurso();
  }
  cargarDatosCurso(): void {
    this.serCursos.presentacionCurso(this.id).subscribe(data => {
      this.datos = data;
      this.curso = this.datos.curso;
      this.modulos = this.datos.modulos;
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
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.imagenCambio = false;
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
    });
  }
  crearModulo(id: number): void {
    const dialogRef = this.dialog.open(CrearModuloComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  editarModulo(id: number): void {
    const dialogRef = this.dialog.open(EditarModuloComponent, {
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
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  abrirRecurso(id: number): void {
    const dialogRef = this.dialog.open(RecursosComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarDatosCurso();
    });
  }
  cambiarImagen(): void {
    const myFormData = new FormData();
    myFormData.append('id_curso', this.id + '');
    myFormData.append('imagen_curso', this.filedata);
    this.serCursos.cambiarImagenCurso(myFormData).subscribe(res => {
      console.log(res);
      this.deleteAttachment(0);
      this.cargarDatosCurso();
    });
  }
  verVideo(ruta): void {
    this.rutaVideo = ruta;
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.serCursos.cambiarEstadoCurso(datos).subscribe(res => {
          console.log(res);
          this.cargarDatosCurso();
        }, error => {
          console.log(error);
        });
        Swal.fire(
          'Enviado!',
          'El Curso se envio a revision correctamente.',
          'success'
        );
      }
    });
  }
}
