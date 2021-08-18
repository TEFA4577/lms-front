import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../../../services/cursos.service';
import { Cursos } from 'src/app/models/cursos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listado-curso-estudiante',
  templateUrl: './listado-curso-estudiante.component.html',
  styleUrls: ['./listado-curso-estudiante.component.scss']
})
export class ListadoCursoEstudianteComponent implements OnInit {
  displayedColumns: string[] = ['nombre_curso', 'usuario_curso', 'usuario_evaluacion'];
  dataSource: MatTableDataSource<Cursos>;
  misEstudiantes: any;
  estado = true;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    public cursoSrv: CursosService
  ) { }

  ngOnInit(): void {
    this.listarMisEstudiantes();
  }

  listarMisEstudiantes(): void{
    this.cursoSrv.listarCursoEstudiantes().subscribe(data =>{
      console.log(data);
      this.misEstudiantes = data;
      if (this.misEstudiantes !== 0) {
        this.estado = false;
      }
      this.dataSource = new MatTableDataSource(this.misEstudiantes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
