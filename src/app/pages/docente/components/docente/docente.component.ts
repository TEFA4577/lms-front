import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocentesService } from 'src/app/services/docentes.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements OnInit {

  docente: any;
  texto = true;
  estado = true;
  cursoDoc: any;
  cursos_docente: any;
  nombre_usuario: any;

  constructor(
    public route: ActivatedRoute,
    public serDocente: DocentesService) { }

  ngOnInit(): void {
    this.mostrarDocentes();
  }

  mostrarDocentes() {
    this.serDocente.listarDocente().subscribe(data => {
      this.docente = data;
      this.nombre_usuario = this.docente;
      console.log(this.nombre_usuario);
      if (this.docente.length !== 0) {
        this.estado = false;
      }
    });
  }
}
