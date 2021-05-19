import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearCursoComponent } from '../crear-curso/crear-curso.component';
import { CursosService } from '../../../../services/cursos.service';
import { MembresiaService } from 'src/app/services/membresia.service';
import { EtiquetasComponent } from '../etiquetas/etiquetas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-curso',
  templateUrl: './listado-curso.component.html',
  styleUrls: ['./listado-curso.component.scss']
})
export class ListadoCursoComponent implements OnInit {
  misCursos: any = [];
  miMemb: any = [];
  estado = true;
  texto = true;
  constructor(
    public dialog: MatDialog,
    public cursoSrv: CursosService,
    public membSrv: MembresiaService,) { }

  ngOnInit(): void {
    this.listarMisCursos();
    this.miMembresia();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CrearCursoComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.listarMisCursos();
    });
  }

  verEtiquetas(curso) {
    console.log(curso);
    const dialogRef = this.dialog.open(EtiquetasComponent, {
      disableClose: true,
      data: curso,
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.listarMisCursos();
    });
  }

  miMembresia(): void {
    this.membSrv.docenteMembresia().subscribe(res => {
      this.miMemb = res;
      console.log(this.miMemb);
    });
  }

  listarMisCursos(): void {
    this.cursoSrv.listarCursosCreados().subscribe(data => {
      this.misCursos = data;
      if (this.misCursos.length !== 0) {
        this.estado = false;
      }
    });
  }

  inhabilitarCurso(id: number): void {
    Swal.fire({
      title: 'Cambiar estado de la Solicitud?',
      text: '¿seguro que desea inhabilitar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoSrv.inhabilitarCurso(id).subscribe(data => {
          this.listarMisCursos();
        });
        Swal.fire(
          'El estado del curso cambio.',
          'success'
        );
      }
    });
  }

  eliminarCurso(id: number): void {
    Swal.fire({
      title: 'Cambiar estado de la Solicitud?',
      text: '¿seguro que desea inhabilitar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoSrv.eliminarCurso(id).subscribe(data => {
          this.listarMisCursos();
        });
        Swal.fire(
          'El estado del curso cambio.',
          'success'
        );
      }
    });
  }
}
