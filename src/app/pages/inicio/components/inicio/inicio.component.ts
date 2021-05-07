import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { CursosService } from '../../../../services/cursos.service';
import { DocentesService } from '../../../../services/docentes.service';
import { PreguntaService } from '../../../../services/pregunta.service';
import { EtiquetaService } from '../../../../services/etiqueta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {
  curso: any;
  etiqueta: any;
  docente: any;
  pregunta: any;
  panelOpenState = false;
  texto = true;

  constructor(
    public serCursos: CursosService,
    public serDocente: DocentesService,
    public serPregunta: PreguntaService,
    public serEtiqueta: EtiquetaService
  ) {
  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarEtiquetas();
    this.cargarDocentes();
    this.cargarPreguntas();
  }

  cargarCursos() {
    this.serCursos.listarCursos().subscribe(data => {
      console.log(data);
      this.curso = data;
    });
  }

  cargarEtiquetas() {
    this.serEtiqueta.listarEtiquetas().subscribe(data => {
      console.log(data);
      this.etiqueta = data;
    });
  }

  cargarDocentes() {
    this.serDocente.listarDocente().subscribe(data => {
      console.log(data);
      this.docente = data;
    });
  }

  cargarPreguntas() {
    this.serPregunta.mostrarPregunta().subscribe(data => {
      console.log(data);
      this.pregunta = data;
    });
  }
}
