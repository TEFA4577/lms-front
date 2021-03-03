import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocentesService } from 'src/app/services/docentes.service';


@Component({
  selector: 'app-presentacion-docente',
  templateUrl: './presentacion-docente.component.html',
  styleUrls: ['./presentacion-docente.component.scss']
})
export class PresentacionDocenteComponent implements OnInit {

  id: any;
  curso: any;
  docente: any;
  texto = true;
  listadoCursos: any = [];

  // tslint:disable-next-line: max-line-length
  constructor(public serDocente: DocentesService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.mostrarDocente();
    this.cursoDeDocente();
  }

  // tslint:disable-next-line: typedef
  mostrarDocente() {
    this.serDocente.mostrarDocente(this.id).subscribe(data => {
      console.log(data);
      this.docente = data;
    });
  }

  cursoDeDocente() {
    this.serDocente.cursoDeDocente(this.id).subscribe(data => {
      console.log(data);
      this.curso = data;
    });
  }

}
