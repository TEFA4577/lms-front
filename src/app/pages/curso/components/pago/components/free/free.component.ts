import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  isActive = false;
  id: any;
  idD: any;
  constructor(
    private formBuilder: FormBuilder,
    public cursoAd: UsuarioService,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    public router: Router,
    public dialogRef: MatDialogRef<FreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data[0];
    this.idD = data[1];
    console.log(this.idD);
  }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/instructores/presentacion-docente/' + this.idD);
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submitAdquirirCurso(event: Event): void {
    event.preventDefault();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    const myFormData = new FormData();
    myFormData.append('id_usuario', id);
    myFormData.append('id_curso', this.id);
    Swal.fire({
      title: 'Seguro que desea adquirir el curso?',
      showDenyButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cursoAd.adquirirCurso(myFormData).subscribe(res => {
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
