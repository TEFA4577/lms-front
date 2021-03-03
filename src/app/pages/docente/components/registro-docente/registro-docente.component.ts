import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocentesService } from 'src/app/services/docentes.service';
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
  docente: any;
  estado = false;
  datosUsuario: any;
  isActive = false;

  filesVideo: any = [];
  videoURL: any;
  filedataV: any;
  filesCV: any = [];
  filedataCV: any;

  constructor(
    public docenteAd: DocentesService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegistroDocenteComponent>,
    private usuarioService: UsuarioService,
    public route: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
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
    myFormData.append('video_instructor', this.filedataV);
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
}
