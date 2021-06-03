import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudesCompraService } from '../../../services/solicitudes-compra.service';
import { Solicitudes } from '../../../models/solicitudes';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalImagenComponent } from '../../../shared/components/modal-imagen/modal-imagen.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-solicitudes-curso',
  templateUrl: './solicitudes-curso.component.html',
  styleUrls: ['./solicitudes-curso.component.scss']
})
export class SolicitudesCursoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['usuario', 'curso', 'comprobante', 'precio', 'id_usuario_curso'];
  dataSource: MatTableDataSource<Solicitudes>;
  solicitudes: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private serSoli: SolicitudesCompraService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarSolicitudes();
    console.log(encodeURIComponent(btoa("12")));
    console.log(atob(decodeURIComponent("MQ%3D%3D")));
  }
  // tslint:disable-next-line: typedef
  openDialog(url) {
    this.dialog.open(ModalImagenComponent, {
      width: 'auto',
      height: '100',
      data: url
    });
  }
  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
  }
  listarSolicitudes(): void {
    this.serSoli.cursosSolicitados().subscribe(data => {
      console.log(data);
      this.solicitudes = data;
      this.dataSource = new MatTableDataSource(this.solicitudes);
      this.dataSource.paginator = this.paginator;

    });
  }
  habilitar(id, estado): void {
    Swal.fire({
      title: 'Cambiar estado de la Solicitud?',
      text: 'seguro que desea cambiar el estado a ' + estado + '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo cambiarlo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serSoli.habiliarCurso(id, estado).subscribe(data => {
          console.log(data);
          this.listarSolicitudes();
        });
        Swal.fire(
          'Habilitado!',
          'El Curso Se Habilito para el usuario.',
          'success'
        );
      }
    });
  }
}
