import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../../../services/cursos.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listado-curso-estudiante',
  templateUrl: './listado-curso-estudiante.component.html',
  styleUrls: ['./listado-curso-estudiante.component.scss']
})
export class ListadoCursoEstudianteComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource: any;
  misEstudiantes: any = [];
  estado = true;

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
    });
  }

}
