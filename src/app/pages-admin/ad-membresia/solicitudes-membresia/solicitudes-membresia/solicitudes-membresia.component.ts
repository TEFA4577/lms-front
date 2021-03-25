import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Solicitudes } from '../../../../models/solicitudes';
import { SolicitudesCompraService } from '../../../../services/solicitudes-compra.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalImagenComponent } from '../../../../shared/components/modal-imagen/modal-imagen.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-membresia',
  templateUrl: './solicitudes-membresia.component.html',
  styleUrls: ['./solicitudes-membresia.component.scss']
})
export class SolicitudesMembresiaComponent implements OnInit {
  displayedColumns: string[]= ['docente', 'membresia', 'comprobante', 'id_membresia_docente'];
  dataSource: MatTableDataSource<Solicitudes>;
  solicitudes: any;
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
    this.serSoli.cursosSolicitados().subscribe(data =>{
      console.log(data);
      this.solicitudes = data;
      this.dataSource = new MatTableDataSource(this.solicitudes);
      this.dataSource.paginator = this.paginator;
    });
  }
  habilitar(id, estado): void {
    Swal.fire({
      title: 'Cambiar estado de la solicitud',
      text: 'seguro que desea cambiar el estado a '+ estado+'?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) =>{
      if (result.isConfirmed) {
        this.serSoli.habiliarCurso(id, estado).subscribe(data => {
          console.log(data);
          this.listarSolicitudes();
        });
        Swal.fire(
          'Habilitado',
          'Membresia habilitada para el usuario',
          'success'
        )
      }
    })
  }
}
