import { Component, OnInit, Input, Inject } from '@angular/core';
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

  formAdquirirCurso: FormGroup;
  respuesta: any;
  isActive = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //@Input()
  id: any;
  idD: any;
  enlace: any;
  estadoCargando = false;

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<PagoMoneComponent>,
    public cursoAd: UsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data[0];
    this.idD = data[1];
    console.log(this.idD);
  }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.id);
  }

  buildForm(): void {
    this.formAdquirirCurso = this.formBuilder.group({
      id_curso: [''],
      id_usuario: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  //PAGO MONE
  datosMoneCurso(event: Event): void {
    event.preventDefault();
    this.estadoCargando = true;
    console.log(this.formAdquirirCurso.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_curso', this.id);
    console.log(this.id);
    this.cursoAd.moneAdC(myFormData).subscribe(res => {

      this.respuesta = res;
      console.log(this.respuesta);
      this.estadoCargando = false;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.enlace = this.respuesta.values.urlpago;
      console.log(this.enlace);
      //this.openUrl();
    }, error => {
      console.log(error);
    });
    /*Swal.fire({
      title: 'Seguro que desea adquirir el curso?',
      showDenyButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
    /*if (result.isConfirmed) {
      this.cursoAd.moneAdC(myFormData).subscribe(res => {
        this.respuesta = res;
        console.log(this.respuesta);
        Swal.fire('Enviado!', '', 'success').finally(() => {
          this.onNoClick();
          this.isActive = false;
        });
        this.openSnackBar(this.respuesta.values.urlpago, 'cerrar');
        //this.openUrl();
      }, error => {
        console.log(error);
      });
    } else if (result.isDenied) {
      Swal.fire('No se envió su solicitud', '', 'info').finally(() => this.isActive = false);
    }
  });*/
  }

  openUrl() {
    const dialogRef = this.dialog.open(PagoMoneComponent, {
      width: '120vh',
      data: {
        html: '<a href="this.respuesta.values.urlpago">Este es tu enlace para el pago</a>'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
