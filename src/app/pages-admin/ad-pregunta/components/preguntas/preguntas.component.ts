import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreguntaService } from '../../../../services/pregunta.service';
import { CrearPreguntaComponent } from '../crear-pregunta/crear-pregunta.component';
import { EditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';
import { CrearRespuestaComponent } from '../respuestas/crear-respuesta/crear-respuesta.component';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})

export class PreguntasComponent implements OnInit {

  panelOpenState = false;
  pregunta: any;
  respuesta: any;

  constructor(
    public serPregunta: PreguntaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarPreguntas();
    this.cargarRespuestas();
  }

  cargarPreguntas() {
    this.serPregunta.mostrarPregunta().subscribe(data => {
      console.log(data);
      this.pregunta = data;
      //console.log(this.pregunta);
    });
  }

  cargarRespuestas() {
    this.serPregunta.mostrarRepuesta().subscribe(data => {
      console.log(data);
      this.respuesta = data;
      console.log(this.respuesta);
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
      this.cargarPreguntasId(id);
    });
  }

  registrarRespuesta(idP: number): void {
    const dialogRef = this.dialog.open(CrearRespuestaComponent, {
      data: idP,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(idP);
      this.cargarRespuestas();
    });
  }
}
