import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocentesUsuarios } from 'src/app/models/docentes';
import { DocentesService } from 'src/app/services/docentes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalImagenComponent } from 'src/app/shared/components/modal-imagen/modal-imagen.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[]= ['nombre_usuario','telefono_docente', 'descripcion_docente', 'experiencia_docente', 'numero_cuenta', 'nombre_banco' ,'video_presentacion', 'estado_docente', 'id_docente'];
  dataSource: MatTableDataSource<DocentesUsuarios>;
  solicitudes: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private serSoli: DocentesService,
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
    this.serSoli.listDocente().subscribe(data =>{
      this.solicitudes = data;
      console.log(this.solicitudes);
      this.dataSource = new MatTableDataSource(this.solicitudes);
      this.dataSource.paginator = this.paginator;
    });
  }
  habilitar(id): void {
    Swal.fire({
      title: 'solicitud',
      text: '¿seguro que desea cambiarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo',
      cancelButtonText: 'No, cancelar!',
    }).then((result) =>{
      if (result.isConfirmed) {
        this.serSoli.habilitarDocente(id).subscribe(data => {
          this.listarSolicitudes();
        });
        Swal.fire(
          'Cambiando'
        )
      }
    })
  }
}
