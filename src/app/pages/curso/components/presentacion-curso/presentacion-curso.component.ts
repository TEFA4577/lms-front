import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {CdkStepper} from '@angular/cdk/stepper';

// Dialog o modal
import { MatDialog } from '@angular/material/dialog';
import { PagoComponent } from '../pago/pago.component';
import { PagoTarjetaComponent } from '../pago/components/pago-tarjeta/pago-tarjeta.component';
import { PagoMoneComponent } from '../pago/components/pago-mone/pago-mone.component';

@Component({
  selector: 'app-presentacion-curso',
  templateUrl: './presentacion-curso.component.html',
  styleUrls: ['./presentacion-curso.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false,
      provide: CdkStepper, useExisting: PresentacionCursoComponent}
  }],
})

export class PresentacionCursoComponent implements OnInit {

  estado = false;
  isActive = false;
  id: any;
  curso: any;
  datos: any;
  docente: any;
  usuario: any;
  modulos: [];
  datosDocente: any;
  mostrarMetodo = false;
  rutaVideo: string;
  // tslint:disable-next-line: max-line-length
  constructor(public route: ActivatedRoute, public serCursos: CursosService, public dialog: MatDialog) { }

  // tslint:disable-next-line: typedef
  ngOnInit(): void {
    this.comprobarAuth();
    this.id = this.route.snapshot.params.id;
    this.getData();
  }
  /*
    *Descripcion: La funcion lista todas los detalles de la presentacion del curso
    * Tipo: obtencion de evento por su ID
  */

  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.estado = true;
    }
  }

  // tslint:disable-next-line: typedef
  getData() {
    this.serCursos.presentacionCurso(this.id).subscribe(data => {
      console.log(data);
      this.datos = data;
      this.curso = this.datos.curso;
      this.docente = this.datos.docente;
      this.datosDocente = this.docente.datos_docente;
      this.modulos = this.datos.modulos;
      console.log(this.datosDocente);
    });
  }
  setVideo(ruta: string) {
    this.rutaVideo = ruta;
    console.log(this.rutaVideo);
  }
  // tslint:disable-next-line: typedef
  metodoDeposito() {
    const dialogRef = this.dialog.open(PagoComponent, {
      width: '140vh',
      data: {
        id: this.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // tslint:disable-next-line: typedef
  metodoTarjeta() {
    const dialogRef = this.dialog.open(PagoTarjetaComponent, {
      width: '120vh',
      data: {
        id: this.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // tslint:disable-next-line: typedef
  metodoMone() {
    const dialogRef = this.dialog.open(PagoMoneComponent, {
      width: '120vh',
      data: {
        id: this.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // tslint:disable-next-line: typedef
  openCompra() {
    this.mostrarMetodo = !this.mostrarMetodo;
  }
}
