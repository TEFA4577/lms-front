import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { PreguntaService } from '../../../../services/pregunta.service';
import { CrearPreguntaComponent } from '../crear-pregunta/crear-pregunta.component';
import { EditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';
import { CrearRespuestaComponent } from '../respuestas/crear-respuesta/crear-respuesta.component';
import { EditarRespuestaComponent } from '../respuestas/editar-respuesta/editar-respuesta.component';

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

  constructor(
    public dialog: MatDialog,
    public serPregunta: PreguntaService,
  ) {
  }

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.serPregunta.mostrarPregunta().subscribe(data => {
      this.pregunta = data;
      //console.log(this.pregunta);
    });
  }

  getIdPregunta(idPregunta:any) {
    this.preguntaId = idPregunta;
    // console.log(this.preguntaId);
    this.cargarRespuestas(idPregunta)
  }

  cargarRespuestas(comments: any): void {
    this.serPregunta.mostrarRepuesta(comments).subscribe(res => {
      console.log(res);
      this.respuesta = res;
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
  editarRespuesta(id: number):void{
    const dialogRef = this.dialog.open(EditarRespuestaComponent, {
      data: id,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(id);
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
      this.cargarRespuestas(idP);
    });
  }
}
