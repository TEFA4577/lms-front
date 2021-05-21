import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkStepper } from '@angular/cdk/stepper';
import { Router } from '@angular/router';

// Dialog o modal
import { MatDialog } from '@angular/material/dialog';
import { PagoComponent } from '../pago/pago.component';
import { PagoTarjetaComponent } from '../pago/components/pago-tarjeta/pago-tarjeta.component';
import { PagoMoneComponent } from '../pago/components/pago-mone/pago-mone.component';
import { FreeComponent } from '../pago/components/free/free.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-presentacion-curso',
  templateUrl: './presentacion-curso.component.html',
  styleUrls: ['./presentacion-curso.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {
      displayDefaultIndicatorType: false,
      provide: CdkStepper, useExisting: PresentacionCursoComponent
    }
  }],
})

export class PresentacionCursoComponent implements OnInit {

  estado = false;
  state = false;
  misCursos: any = [];
  isActive = false;
  id: any;
  idD: any;
  curso: any;
  datos: any;
  docente: any;
  usuario: any;
  usuarioCurso: [];
  modulos: [];
  compra: any;
  datosDocente: any;
  mostrarMetodo = false;
  rutaVideo: string;
  datosUsuario: any;
  estado_usuario_curso: any;
  // tslint:disable-next-line: max-line-length
  constructor(public route: ActivatedRoute,
    public serCursos: CursosService,
    public miscursosSrv: UsuarioService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private router: Router) { }
  // tslint:disable-next-line: typedef
  ngOnInit(): void {
    this.comprobarAuth();
    this.id = this.route.snapshot.params.id;
    this.setCurso();
    this.getData();
    this.comprobarAuth();
    this.misCursosAd();
  }
  /*
    *Descripcion: La funcion lista todas los detalles de la presentacion del curso
    * Tipo: obtencion de evento por su ID
  */
  comprobarAuth(): void {
    this.estado = this.miscursosSrv.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    console.log(this.estado);
  }

  /*misCursosAd(): void {
    this.miscursosSrv.misCursos().subscribe(data => {
      this.misCursos = data;
      console.log(this.misCursos);
      if (this.state = this.misCursos.length !== 0) {
        console.log(this.misCursos.length);
        console.log(this.state);
      }
    });
  }*/



  misCursosAd(): void {
    this.miscursosSrv.misCursos().subscribe(data => {
      this.misCursos = data;
      console.log(this.misCursos);
      if (this.state) {
        this.misCursos.length !== 0
        this.state = false;
      }
    });
  }


  getData() {
    this.serCursos.presentacionCurso(this.id).subscribe(data => {
      this.datos = data;
      this.curso = this.datos.curso;
      this.docente = this.datos.docente;
      this.datosDocente = this.docente.datos_docente;
      this.modulos = this.datos.modulos;
      this.usuarioCurso = this.datos.usuarioCurso;
      this.idD = this.docente.id_usuario;
    });
  }

  setCurso() {
    this.serCursos.cursarCurso(this.id).subscribe(data => {
      this.datos = data;
      console.log(this.datos);
    });
  }

  verVideo(ruta): void {
    this.rutaVideo = ruta;
  }
  setVideo(ruta: string) {
    this.rutaVideo = ruta;
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
      this.router.navigateByUrl('estudiante/mis-cursos-adquiridos');
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
  metodoFree() {
    const dialogRef = this.dialog.open(FreeComponent, {
      width: '120vh',
      data:[
        this.id,
        this.idD,
      ]
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
