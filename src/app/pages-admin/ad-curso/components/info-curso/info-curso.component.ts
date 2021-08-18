import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from './components/comments/comments.component';

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
  curso:any;
  modulos: any;
  pruebas: any;
  mostrarForo = false;
  idClase: any;

  constructor(
    public cursoSrv: CursosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
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
      this.curso = this.datos.curso;
      this.modulos = this.datos.modulos;
      this.pruebas = this.datos.prueba;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  openForo(idClase: any) {
    this.mostrarForo = !this.mostrarForo;
    this.openComentarios(idClase);
  }

  openComentarios(comments) {
    this.cursoSrv.mostrarComentario(comments).subscribe(res => {
      this.dat = res;
      console.log(this.dat);
    }, error => {
      console.log(error);
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
      this.openComentarios(this.idClase);
    });
  }

  listarMisEstudiantes(): void {
    this.cursoSrv.listarCursoEstudiantes().subscribe(data => {
      console.log(data);
      this.misEstudiantes = data;
      if (this.misEstudiantes !== 0) {
        this.estado = false;
      }
    });
  }
}
