import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { DocentesService } from '../../../../services/docentes.service';

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

  constructor(public serCursos: CursosService, public serDocente: DocentesService) {
  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarEtiquetas();
    this.cargarDocentes();
  }
  // tslint:disable-next-line: typedef
  cargarCursos() {
    this.serCursos.listarCursos().subscribe(data => {
      console.log(data);
      this.curso = data;
    });
  }

  // tslint:disable-next-line: typedef
  cargarEtiquetas() {
    this.serCursos.etiquetaCurso().subscribe(data => {
      console.log(data);
      this.etiqueta = data;
    });
  }

  // tslint:disable-next-line: typedef
  cargarDocentes() {
    this.serDocente.listarDocente().subscribe(data => {
      console.log(data);
      this.docente = data;
      console.log(this.listadoCursos.length);
      if (this.listadoCursos.length !== 0) {
        this.estado = false;
      }
    });
  }
}
