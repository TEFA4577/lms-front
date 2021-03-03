import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {

  curso: any;
  estado = true;
  texto = true;

  constructor(public serCursos: CursosService) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos() {
    this.serCursos.listarCursos().subscribe(data => {
      console.log(data);
      this.curso = data;
    });
  }

}
