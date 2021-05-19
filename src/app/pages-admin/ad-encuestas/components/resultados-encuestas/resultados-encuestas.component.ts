import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { EncuestasService } from '../../../../services/encuestas.service';
import { MatTableDataSource } from '@angular/material/table';
import { EncuestaRespuesta } from '../../../../models/encuesta-respuesta';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-resultados-encuestas',
  templateUrl: './resultados-encuestas.component.html',
  styleUrls: ['./resultados-encuestas.component.scss'],
})
export class ResultadosEncuestasComponent implements OnInit {

  id: number;
  respuestas: any;
  cantidad:any;
  displayedColumns: string[] = ['id_encuesta_respuesta', 'texto_encuesta_respuesta','created_at', 'estado_encuesta_respuesta'];
  dataSource: MatTableDataSource<EncuestaRespuesta>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialogRef: MatDialogRef<ResultadosEncuestasComponent>,
    public serEncuesta: EncuestasService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.getResultados();
    this.cantidadRes();
  }

  getResultados() {
    this.serEncuesta.mostrarPregunta(this.id).subscribe(data => {
      console.log(data);
      this.respuestas = data;
      console.log(this.respuestas.length);
      this.dataSource = new MatTableDataSource(this.respuestas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  cantidadRes(){
    this.serEncuesta.cantidadRes(this.id).subscribe(data => {
      console.log(data);
      this.cantidad = data;
    });
  }

}
