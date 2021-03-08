import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Preguntas } from '../../../../models/pregunta';
import { PreguntaService } from '../../../../services/pregunta.service';
import { EditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';
import { CrearPreguntaComponent } from '../crear-pregunta/crear-pregunta.component';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {
  displayedColumns: string[] = ['texto_pregunta'];
  dataSource: MatTableDataSource<Preguntas>;
  preguntas: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public serPregunta: PreguntaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  registrarPregunta(): void {
    const dialogRef = this.dialog.open(CrearPreguntaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
