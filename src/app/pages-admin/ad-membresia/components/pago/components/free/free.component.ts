import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  formAdquirirMemb: FormGroup;
  isActive = false;
  id: any;

  constructor(
    public membresiaAd: UsuarioService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<FreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submitAdquirirMemb(event: Event): void {
    event.preventDefault();
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_membresia', this.id);

    Swal.fire({
      title: 'Seguro que desea adquirir la membresia?',
      showDenyButton: true,
      confirmButtonText: `Si, enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.membresiaAd.adquirirMembresia(myFormData).subscribe(res => {
          this.respuesta = res;
          Swal.fire({
            title: this.respuesta.mensaje,
            icon: this.respuesta.estado
          }).finally(() => {
            this.onNoClick();
            this.isActive = false;
          });
        }, error => {
          console.log(error);
        });
      } else if (result.isDenied) {
        Swal.fire('No se envió su solicitud', '', 'warning').finally(() => this.isActive = false);
      }
    });
  }
}
