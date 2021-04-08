import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrearEncuestaComponent } from '../../components/crear-encuesta/crear-encuesta.component';
import { EditarEncuestaComponent } from '../../components/editar-encuesta/editar-encuesta.component';
import { CrearPreguntasComponent } from '../../components/crear-preguntas/crear-preguntas.component';

import { EncuestasService } from '../../../../services/encuestas.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Encuestas } from '../../../../models/encuestas';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EncuestasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id_encuesta', 'id_rol', 'texto_encuesta', 'updated_at', 'created_at'];
  dataSource: MatTableDataSource<Encuestas>;
  expandedElement: Encuestas | null;
  encuestas: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public serEncuesta: EncuestasService
  ) { }

  ngOnInit(): void {
    this.listarEncuestas();
  }

  listarEncuestas(){
    this.serEncuesta.listarEncuestas().subscribe(data => {
      console.log(data);
      this.encuestas = data;
      this.dataSource = new MatTableDataSource(this.encuestas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
  }

  crearEncuesta(): void {
    const dialogRef = this.dialog.open(CrearEncuestaComponent, {
      disableClose: true,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarEncuestas();
    });
  }

  editarTitulo(): void {

  }

  registrarPregunta(idP: number): void {
    const dialogRef = this.dialog.open(CrearPreguntasComponent, {
      data: idP,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(idP);
      this.listarEncuestas();
    });
  }

}
