import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cursos } from '../../../models/cursos';
import { CursosService } from '../../../services/cursos.service';
import { DetalleCursoComponent } from '../components/detalle-curso/detalle-curso.component';

@Component({
  selector: 'app-lista-ad-curso',
  templateUrl: './lista-ad-curso.component.html',
  styleUrls: ['./lista-ad-curso.component.scss']
})
export class ListaAdCursoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre_curso', 'descripcion_curso', 'created_at', 'updated_at', 'id_curso'];
  dataSource: MatTableDataSource<Cursos>;
  cursos: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public serCurso: CursosService,
    public dialog: MatDialog,
  ) {
  }
  listarCursos(): void {
    this.serCurso.listarCursosNoAprobados().subscribe(data => {
      console.log(data);
      this.cursos = data;
      this.dataSource = new MatTableDataSource(this.cursos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
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
  verDetalle(id: number): void {
    const dialogRef = this.dialog.open(DetalleCursoComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarCursos();
    });
  }
}
