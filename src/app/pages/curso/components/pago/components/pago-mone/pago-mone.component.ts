import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
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

  id:any;
  respuesta: any;
  isActive = false;

  constructor(public route: ActivatedRoute, public dialogRef: MatDialogRef<PagoMoneComponent>, public serCursos: CursosService, public cursoAd: UsuarioService, private _snackBar: MatSnackBar,private usuarioService: UsuarioService) { }

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
        this.cursoAd.adquirirCurso(myFormData).subscribe(res => {
          const estad = this.usuarioService.estadoSession;
          console.log(res);
          this.respuesta = res;
          this.openSnackBar(this.respuesta.mensaje, 'cerrar');
        }, error => {
          console.log(error);
        });
  }
}
