import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

  @Input()
  // tslint:disable-next-line: no-unused-expression
  id: any;
  idm: any;

  constructor(
    private formBuilder: FormBuilder,
    public membresiaAd: UsuarioService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<PagoDepositoComponent>,
  ) { }

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

  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.files.push(element.name);
      this.filedata = element;
      console.log(element);
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
  }
  submitAdquirirMembresia(event: Event): void {
    event.preventDefault();
    console.log(this.formAdquirirMembresia.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const idm = JSON.parse(localStorage.getItem('id_membresia'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_membresia', idm);
    myFormData.append('comprobante', this.filedata);
    console.log(this.id);
    Swal.fire({
      title: 'Seguro que desea enviar el comprobante?',
      showDenyButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `No enviar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.membresiaAd.adquirirMembresia(myFormData, idm).subscribe(res => {
          const estad = this.usuarioService.estadoSession;
          console.log(res);
          this.respuesta = res;
          Swal.fire('Enviado!', '', 'success').finally(() => {
            this.onNoClick();
            this.isActive = false;
          });
          localStorage.removeItem('id_membresia');
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
