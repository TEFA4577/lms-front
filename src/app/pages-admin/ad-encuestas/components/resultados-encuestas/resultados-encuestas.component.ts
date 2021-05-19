import { Component, OnInit, ViewChild} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EncuestasService } from '../../../../services/encuestas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Encuestas } from '../../../../models/encuestas';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-resultados-encuestas',
  templateUrl: './resultados-encuestas.component.html',
  styleUrls: ['./resultados-encuestas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResultadosEncuestasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  encuestas: any;
  resulEncuesta:any;
  preguntas: any;

  displayedColumns: string[] = ['texto_encuesta', 'updated_at', 'created_at'];
  dataSource: MatTableDataSource<Encuestas>;
  expandedElement: Encuestas | null;


  constructor(
    public serEncuesta: EncuestasService
  ) { }

  ngOnInit(): void {
    this.listarEncuestas();
    this.listarPreguntas();
  }

  listarEncuestas() {
    this.serEncuesta.listarEncuestas().subscribe(data => {
      console.log(data);
      this.encuestas = data;
      this.resulEncuesta = this.encuestas;
      console.log(this.resulEncuesta.length);
      this.encuestas = data;
      this.dataSource = new MatTableDataSource(this.encuestas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listarPreguntas(){
    this.serEncuesta.listarPreguntasEncuestas().subscribe( data => {
      console.log(data);
      this.preguntas = data;
      console.log(this.preguntas.length);
    });
  }

}
