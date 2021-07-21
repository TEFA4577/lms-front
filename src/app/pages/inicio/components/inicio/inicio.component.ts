import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { CursosService } from '../../../../services/cursos.service';
import { DocentesService } from '../../../../services/docentes.service';
import { PreguntaService } from '../../../../services/pregunta.service';
import { EtiquetaService } from '../../../../services/etiqueta.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { left } from '@popperjs/core';

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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      400: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true
      },
    },
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
