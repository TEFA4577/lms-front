import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Etiquetas } from '../../../../models/etiquetas';
import { EtiquetaService } from '../../../../services/etiqueta.service';
import { EditarEtiquetaComponent } from '../editar-etiqueta/editar-etiqueta.component';
import { CrearEtiquetaComponent } from '../crear-etiqueta/crear-etiqueta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.scss']
})
export class EtiquetasComponent implements OnInit {
  displayedColumns: string[] = ['nombre_etiqueta', 'descripcion_etiqueta', 'imagen_etiqueta', 'estado_etiqueta', 'id_etiqueta'];
  dataSource: MatTableDataSource<Etiquetas>;
  etiquetas: any;
  estadoCargando = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // obtener el orden de la tabla
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public serEtiqueta: EtiquetaService,
    public dialog: MatDialog,
  ) {
  }
  listarEtiquetas(): void {
    this.serEtiqueta.listarEtiquetas().subscribe(data => {
      this.etiquetas = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.etiquetas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    this.listarEtiquetas();
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
    console.log(id);
    const dialogRef = this.dialog.open(EditarEtiquetaComponent, {
      disableClose: true,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarEtiquetas();
    });
  }

  registrarEtiqueta(): void {
    const dialogRef = this.dialog.open(CrearEtiquetaComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarEtiquetas();
    });
  }
  cambiarEstado(id: number): void {
    Swal.fire({
      title: 'Eliminar Recurso?',
      text: 'seguro que desea eliminar el Recurso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminar',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.estadoCargando = !this.estadoCargando;
        this.serEtiqueta.eliminarEtiqueta(id).subscribe(res => {
          console.log(res);
          this.listarEtiquetas();
        });
        Swal.fire(
          'Eliminado!',
          'El Recurso se elimino correctamente.',
          'success'
        );
      }
    });
  }
}
