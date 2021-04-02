import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { CursosService } from '../../../../services/cursos.service';
import { DocentesService } from '../../../../services/docentes.service';
import {PreguntaService } from '../../../../services/pregunta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  curso: any;
  etiqueta: any;
  docente: any;
  listadoCursos: any = [];
  estado = true;
  texto = true;
  pregunta: any;
  panelOpenState = false;
  respuesta: any;

  constructor(public serCursos: CursosService, public serDocente: DocentesService, public serPregunta: PreguntaService) {
  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarEtiquetas();
    this.cargarDocentes();
    this.cargarPreguntas();
    this.cargarRespuestas();
  }

  cargarCursos() {
    this.serCursos.listarCursos().subscribe(data => {
      this.curso = data;
    });
  }

  cargarEtiquetas() {
    this.serCursos.etiquetaCurso().subscribe(data => {
      this.etiqueta = data;
    });
  }

  cargarDocentes() {
    this.serDocente.listarDocente().subscribe(data => {
      this.docente = data;
      if (this.listadoCursos.length !== 0) {
        this.estado = false;
      }
    });
  }

  cargarPreguntas(){
    this.serPregunta.mostrarPregunta().subscribe(data => {
      this.pregunta = data;
    });
  }

  cargarRespuestas(){
    this.serPregunta.mostrarRepuesta().subscribe(data => {
      this.respuesta = data;
    });
  }
}
