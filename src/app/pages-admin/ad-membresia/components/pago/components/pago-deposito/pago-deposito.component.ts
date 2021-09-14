import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseStorageService } from 'src/app/firebase-storage.service'; //CODIGO PARA FIREBASE STORAGE
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-deposito',
  templateUrl: './pago-deposito.component.html',
  styleUrls: ['./pago-deposito.component.scss']
})
export class PagoDepositoComponent implements OnInit {
  respuesta: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  panelOpenState = false;
  formAdquirirMembresia: FormGroup;
  files: any = [];
  filedata: any;
  imgURL: any;
  isActive = false;
  // tslint:disable-next-line: no-unused-expression
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    public membresiaAd: UsuarioService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService, //CODIGO PARA FIREBASE
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<PagoDepositoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(this.id);
  }

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
  }


  ngOnInit(): void {
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm(): void {
    this.formAdquirirMembresia = this.formBuilder.group({
      id_membresia: [''],
      id_usuario: [''],
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  /*uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.files.push(element.name);
      this.filedata = element;
      var reader = new FileReader();
      reader.readAsDataURL(event[index]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
      console.log(this.formAdquirirMembresia.get('id_usuario').value);
    }
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
  }*/

  submitAdquirirMembresia(event: Event): void {
    event.preventDefault();
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_membresia', this.id);
    myFormData.append('comprobante', this.filedata);

    Swal.fire({
      title: 'Seguro que desea enviar el comprobante?',
      showDenyButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.membresiaAd.adquirirMembresia(myFormData).subscribe(res => {
          const estad = this.usuarioService.estadoSession;
          this.respuesta = res;
          Swal.fire('Enviado!', '', 'success').finally(() => {
            this.onNoClick();
            this.isActive = false;
            this.router.navigateByUrl('admin/cursos/mis-cursos');
          });
          this.openSnackBar(this.respuesta.mensaje, 'cerrar');
        }, error => {
          console.log(error);
        });
      } else if (result.isDenied) {
        Swal.fire('No se envió su comprobante', '', 'info').finally(() => this.isActive = false);
      }
    });
  }
}
