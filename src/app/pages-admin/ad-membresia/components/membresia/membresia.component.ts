import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MembresiaService } from 'src/app/services/membresia.service';
import { Membresias } from 'src/app/models/membresias';
import { EditarMembresiaComponent } from '../editar-membresia/editar-membresia.component';
import { CrearMembresiaComponent } from '../crear-membresia/crear-membresia.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent implements OnInit {
  displayedColumns: string[] = ['nombre_membresia', 'imagen_membresia', 'texto_membresia', 'precio_membresia', 'duracion_membresia', 'id_membresia'];
  dataSource: MatTableDataSource<Membresias>;
  membresias: any;
  estado = true;
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
    this.serMembreia.admMembresia().subscribe(data => {
      this.membresias = data;
      this.dataSource = new MatTableDataSource(this.membresias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.membresias.length !== 0){
        this.estado = false;
      }
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
      disableClose: true,
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarMembresia();
      console.log(id);
    });
  }
  registrarMembresia(): void {
    const dialogRef = this.dialog.open(CrearMembresiaComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listarMembresia();
    });
  }
  eliminarMembresia(id: number): void{
    Swal.fire({
      title: 'Eliminar Membresia',
      text: '??est?? seguro que desea cambiar de estado?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.serMembreia.eliminarMembresia(id).subscribe(res => {
          this.listarMembresia();
        });
      }
    });
  }
  membresiaHD(id): void {
    let timerInterval;
    Swal.fire({
      title: 'Cambiar estado de membrecia',
      text: '????seguro que desea cambiar?!',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire({
          title: 'Procesando...',
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => 50)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        });
        this.serMembreia.hablitarMembresia(id).subscribe(data => {
          this.listarMembresia();
        });
      }
    });
  }

}
