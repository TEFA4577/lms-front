import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PreguntaService } from '../../../../services/pregunta.service';
import { CrearPreguntaComponent } from '../crear-pregunta/crear-pregunta.component';
import { EditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';
import { CrearRespuestaComponent } from '../respuestas/crear-respuesta/crear-respuesta.component';
import { EditarRespuestaComponent } from '../respuestas/editar-respuesta/editar-respuesta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})

export class PreguntasComponent implements OnInit {

  panelOpenState = false;
  pregunta: any;
  respuesta: any;
  id: number;
  preguntaId: any;
  dat: any;
  estado: any;
  state: any;

  constructor(
    public dialog: MatDialog,
    public serPregunta: PreguntaService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.cargarPreguntas();
    this.cargarRespuestas();
  }

  cargarPreguntas() {
    this.serPregunta.mostrarPregunta().subscribe(data => {
      this.pregunta = data;
      console.log(this.pregunta);

    });
    //if (this.pregunta.length == 1) {
      //this.estado = false;
    //}
  }

  cargarRespuestas() {
    this.serPregunta.mostrarRepuesta().subscribe(res => {
      this.respuesta = res;
    });
  }

  getIdPregunta(idPregunta: any) {
    this.preguntaId = idPregunta;
    // console.log(this.preguntaId);
  }

  cargarDatos(): void {
    this.serPregunta.mostrarPregunta().subscribe(res => {
      this.dat = res;
      console.log(this.dat);
    }, error => {
      console.log(error);
    });
  }



  cargarPreguntasId(res) {
    this.serPregunta.datosPregunta(res).subscribe(data => {
      console.log(data);
      //console.log(this.pregunta);
    });
  }


  registrarPregunta(): void {
    const dialogRef = this.dialog.open(CrearPreguntaComponent, {
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarPreguntas();
    });
  }

  editarPregunta(id: number): void {
    const dialogRef = this.dialog.open(EditarPreguntaComponent, {
      data: id,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(id);
      this.cargarPreguntas();
    });
  }

  editarRespuesta(idR: number): void {
    const dialogRef = this.dialog.open(EditarRespuestaComponent, {
      data: idR,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(idR);
      this.cargarPreguntas();
    });
  }
  registrarRespuesta(idP: number): void {
    const dialogRef = this.dialog.open(CrearRespuestaComponent, {
      data: idP,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarPreguntas();
    });
  }

  borrarPregunta(id: number): void {
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
        this.serPregunta.eliminarPregunta(id).subscribe(res => {
          console.log(res);
          this.cargarPreguntas();
        });
        Swal.fire(
          'Eliminado!',
          'La Clase se elimino correctamente.',
          'success'
        );
      }
    });
  }

  borrarRespuesta(id: number): void {
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
        this.serPregunta.eliminarRespuesta(id).subscribe(res => {
          console.log(res);
          this.cargarPreguntas();
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
