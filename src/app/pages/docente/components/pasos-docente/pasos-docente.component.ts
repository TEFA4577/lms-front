import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
// Dialog o modal
import { MatDialog } from '@angular/material/dialog';
import { RegistroDocenteComponent } from '../../../../pages/docente/components/registro-docente/registro-docente.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-pasos-docente',
  templateUrl: './pasos-docente.component.html',
  styleUrls: ['./pasos-docente.component.scss']
})
export class PasosDocenteComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;
  mobileQuery: MediaQueryList;
  open = false;
  estado: boolean;
  datosUsuario: any;
  isActive = false;
  etiqueta: any;
  searchClass: any;
  curso: any;
  data: any;
  cursos = [];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  comprobarAuth(): void {
    this.estado = this.usuarioService.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    console.log(this.estado);
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegistroDocenteComponent, {
      width: '1000vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('carga');
      this.comprobarAuth();
      window.location.reload();
    });
  }

}
