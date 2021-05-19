import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cursos } from '../../../../models/cursos';
import { CursosService } from '../../../../services/cursos.service';
import { DetalleCursoComponent } from '../../components/detalle-curso/detalle-curso.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-estado-curso',
  templateUrl: './administrar-estado-curso.component.html',
  styleUrls: ['./administrar-estado-curso.component.scss']
})
export class AdministrarEstadoCursoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre_curso', 'descripcion_curso', 'created_at', 'updated_at', 'estado', 'id_curso'];
  dataSource: MatTableDataSource<Cursos>;
  cursos: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public serCurso: CursosService,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.listarCursos();
  }
  applyFilter(event: Event): void {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarCursos(): void {
    this.serCurso.estadoCursos().subscribe(data => {
      console.log(data);
      this.cursos = data;
      this.dataSource = new MatTableDataSource(this.cursos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  habilitar(id: number): void {
    Swal.fire({
      title: 'Cambiar estado de la Solicitud?',
      text: '¿seguro que desea habilitar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serCurso.habilitarCurso(id).subscribe(data => {
          console.log(data);
          this.listarCursos();
        });
        Swal.fire(
          'El estado del curso cambio.',
          'success'
        );
      }
    });
  }

  inhabilitar(id: number): void {
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
        this.serCurso.inhabilitarCurso(id).subscribe(data => {
          console.log(data);
          this.listarCursos();
        });
        Swal.fire(
          'El estado del curso cambio.',
          'success'
        );
      }
    });
  }

}
