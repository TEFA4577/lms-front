import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  constructor(
    public setCursos: CursosService
  ) { }

  ngOnInit(): void {
  }

}
