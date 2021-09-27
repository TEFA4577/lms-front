import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from './components/comments/comments.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-info-curso',
  templateUrl: './info-curso.component.html',
  styleUrls: ['./info-curso.component.scss']
})
export class InfoCursoComponent implements OnInit {

  panelOpenState = false;
  misEstudiantes: any;
  estado = true;
  dat: any;
  id: any;
  datos: any;
  curso: any;
  modulos: any;
  pruebas: any;
  mostrarForo = false;
  idClase: any;
  usuarioCurso: any;
  cantEst: any;
  datosUsuario: any;

  constructor(
    public cursoSrv: CursosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.listarMisEstudiantes();
    this.cargarDatosCurso();
  }

  cargarDatosCurso(): void {
    this.cursoSrv.presentacionCurso(this.id).subscribe(data => {
      this.datos = data;
      this.cantEst = this.datos.usuarioCurso.length;
      this.curso = this.datos.curso;
      this.modulos = this.datos.modulos;
      this.pruebas = this.datos.prueba;
      this.usuarioCurso = this.datos.usuarioCurso;
      //console.log(this.datos);
    }, error => {
      //console.log(error);
    });
  }

  /*imagenError(): void {
    this.datosUsuario.foto_usuario = 'https://ui-avatars.com/api/?background=random&name=' + this.datosUsuario.nombre_usuario;
  }*/
  comprobarAuth(): void {
    this.estado = this.usuarioService.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    //console.log(this.estado);
  }


  openForo(idClase: any) {
    this.mostrarForo = !this.mostrarForo;
    this.openComentarios(idClase);
  }

  openComentarios(comments) {
    this.cursoSrv.mostrarComentario(comments).subscribe(res => {
      this.dat = res;
      //console.log(this.dat);
    }, error => {
      //console.log(error);
    });
  }

  openRespuestas(idR: number): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      data: idR,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.cargarDatos();
      //this.openComentarios(this.idClase);
    });
  }

  listarMisEstudiantes(): void {
    this.cursoSrv.listarCursoEstudiantes().subscribe(data => {
      //console.log(data);
      this.misEstudiantes = data;
      if (this.misEstudiantes !== 0) {
        this.estado = false;
      }
    });
  }
}
