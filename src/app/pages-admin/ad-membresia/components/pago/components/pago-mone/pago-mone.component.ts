import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pago-mone',
  templateUrl: './pago-mone.component.html',
  styleUrls: ['./pago-mone.component.scss']
})
export class PagoMoneComponent implements OnInit {

  formAdquirirMembresia: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  id: any;
  idm: any;
  respuesta: any;
  isActive = false;
  estadoCargando = false;

  idD: any;
  enlace: any;

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<PagoMoneComponent>,
    public membresiaAd: UsuarioService, private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }
  ngOnInit(): void {
    this.buildForm();
    console.log(this.id);
  }

  buildForm(): void {
    this.formAdquirirMembresia = this.formBuilder.group({
      id_membresia: [''],
      id_usuario: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  datosMoneMembresia(event: Event): void {
    event.preventDefault();
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_membresia', this.id);
    console.log(this.id);
    this.membresiaAd.moneAdM(myFormData).subscribe(res => {
      const estad = this.usuarioService.estadoSession;
      console.log(res);
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      localStorage.removeItem('id_membresia');
    }, error => {
      console.log(error);
    });
  }

}
