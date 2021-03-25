import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MembresiaService } from 'src/app/services/membresia.service';
import { Membresias } from 'src/app/models/membresias';
import { EditarMembresiaComponent } from '../../editar-membresia/editar-membresia/editar-membresia.component';
import { CrearMembresiaComponent } from '../../crear-membresia/crear-membresia/crear-membresia.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent implements OnInit {
  displayedColumns: string[] = ['nombre_membresia', 'texto_membresia', 'precio_membresia', 'membresia', 'id_membresia'];
  dataSource: MatTableDataSource<Membresias>;
  membresias: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private serMembreia: MembresiaService
  ) { }

  ngOnInit(): void {
    this.listarMembresia();
  }

  listarMembresia(): void {
    this.serMembreia.listarMembresia().subscribe(data => {
      this.membresias = data;
      this.dataSource = new MatTableDataSource(this.membresias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editarMembresia(id: number): void {
    const dialogRef = this.dialog.open(EditarMembresiaComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarMembresia();
    });
  }
  registrarMembresia(): void {
    const dialogRef = this.dialog.open(CrearMembresiaComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarMembresia();
    });
  }
  eliminarMembresia(id: number): void{
    Swal.fire({
      title: 'Eliminar Membresia',
      text: 'está seguro que desea eliminar la membresia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminar',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serMembreia.eliminarMembresia(id).subscribe(res => {
          this.listarMembresia();
        });
      }
    });
  }
  membresiaHD(id): void {
    Swal.fire({
      title: 'Cambiar estado de membrecia',
      text: 'seguro que desea cambiar el estado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if(result.isConfirmed){
        this.serMembreia.hablitarMembresia(id).subscribe(data => {
          this.listarMembresia();
        });
      }
    });
  }

}
