import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { CrearEncuestaComponent } from '../../components/crear-encuesta/crear-encuesta.component';
import { EditarEncuestaComponent } from '../../components/editar-encuesta/editar-encuesta.component';
import { CrearPreguntasComponent } from '../../components/crear-preguntas/crear-preguntas.component';

import { EncuestasService } from '../../../../services/encuestas.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Encuestas } from '../../../../models/encuestas';
import { EditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';

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
  resulEncuesta: any;
  preguntas: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
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

  destinoEncuesta(encu) {
    console.log(encu);
    const dialogRef = this.dialog.open(UsuariosComponent, {
      disableClose: true,
      data: encu,
      });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.listarEncuestas();
    });
  }


  //edicion del titulo de la encuesta
  editarTitulo(id: number): void {
    const dialogRef = this.dialog.open(EditarEncuestaComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarEncuestas();
    });
  }

  eliminarEncuesta(id: number): void{
    Swal.fire({
      title: 'Eliminar clase?',
      text: 'seguro que desea eliminar la clase!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serEncuesta.eliminarEncuesta(id).subscribe(res => {
          console.log(res);
          this.listarEncuestas();
        });
        Swal.fire(
          'Eliminado!',
          'La encuesta se elimino correctamente.',
          'success'
        );
      }
    });
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

  editarPregunta(idPE: number): void{
    const dialogRef = this.dialog.open(EditarPreguntaComponent, {
      data: idPE,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(idPE);
      this.listarEncuestas();
    });
  }

  eliminarPregunta(id: number): void{
    Swal.fire({
      title: 'Eliminar clase?',
      text: 'seguro que desea eliminar la clase!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serEncuesta.eliminarPregunta(id).subscribe(res => {
          console.log(res);
          this.listarEncuestas();
        });
        Swal.fire(
          'Eliminado!',
          'La Clase se elimino correctamente.',
          'success'
        );
      }
    });
  }

}
