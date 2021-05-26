import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudesMembresia } from '../../../models/solicitudes';
import { SolicitudesCompraService } from '../../../services/solicitudes-compra.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalImagenComponent } from '../../../shared/components/modal-imagen/modal-imagen.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-membresia',
  templateUrl: './solicitudes-membresia.component.html',
  styleUrls: ['./solicitudes-membresia.component.scss']
})
export class SolicitudesMembresiaComponent implements OnInit {
  displayedColumns: string[]= ['usuario', 'membresia', 'imagen_membresia', 'comprobante', 'estado_membresia_usuario', 'inicio_membresia_usuario', 'fin_membresia_usuario', 'id_membresia_usuario'];
  dataSource: MatTableDataSource<SolicitudesMembresia>;
  solicitudes: any;
  membresia: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private serSoli: SolicitudesCompraService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarSolicitudes();
    console.log(encodeURIComponent(btoa("12")));
    console.log(atob(decodeURIComponent("MQ%3D%3D")));
  }
  openDialog(url){
    this.dialog.open(ModalImagenComponent, {
      width: 'auto',
      height: '100',
      data: url
    });
  }
  listarSolicitudes(): void {
    this.serSoli.membresiaSolicitadas().subscribe(data =>{
      console.log(data);
      this.solicitudes = data;
      this.dataSource = new MatTableDataSource(this.solicitudes);
      this.dataSource.paginator = this.paginator;
    });
  }
  habilitar(id, estado): void {
    Swal.fire({
      title: estado+' membresia',
      text: '¿seguro que desea '+ estado+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) =>{
      if (result.isConfirmed) {
        this.serSoli.habilitarMembresia(id, estado).subscribe(data => {
          this.listarSolicitudes();
          this.membresia = data;
          Swal.fire({
            title: this.membresia.mensaje,
            icon: this.membresia.state
          });
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
