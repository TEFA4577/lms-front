import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.scss'],
})
export class FreeComponent implements OnInit {
  respuesta: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  panelOpenState = false;
  formAdquirirCurso: FormGroup;
  files: any = [];
  filedata: any;
  imgURL: any;
  isActive = false;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    public cursoAd: UsuarioService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<FreeComponent>,
  ) { }

    // tslint:disable-next-line: typedef
    ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    openSnackBar(message: string, action: string): void {
      this._snackBar.open(message, action, {
        duration: 3000,
      });
    }

  submitAdquirirCurso(event: Event): void {
    event.preventDefault();
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_curso', this.id);
    console.log(this.id);
    Swal.fire({
      title: 'Seguro que desea adquirir el curso?',
      showDenyButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cursoAd.adquirirCurso(myFormData).subscribe(res => {
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
