import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { DocentesService } from '../../../../services/docentes.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  imagenPerfilCambio = false;
  isActive = false;
  estado = false;

  constructor(
    public srvEstudiante: UsuarioService,
    public srvDocente: DocentesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.comprobarAuth();
    this.buildForm();
    this.formBuild();
  }

  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      console.log(this.datosUsuario);
      this.estado = true;
    }
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
    myFormData.append('foto', this.filedata);
    myFormData.append('_method', 'put');
    myFormData.append('nombre_usuario', this.formUsuario.get('nombre_usuario').value);
    myFormData.append('correo_usuario', this.formUsuario.get('correo_usuario').value);
    this.srvEstudiante.actualizarUsuario(myFormData, id).subscribe(res =>{
      const obj: any = res;
      localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
    });
  }
  actualizarPerfilDocente(event): void {
    event.preventDefault();
    console.log(this.formDocente.value);
    this.srvDocente.actualizarDocente(this.formDocente.value, this.datosUsuario.id_usuario).subscribe(res => {
      console.log(res);
      const obj: any = res;
      localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
    }, error => {
      console.log(error);
    });
  }
}
