import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-mis-cursos-adquiridos',
  templateUrl: './mis-cursos-adquiridos.component.html',
  styleUrls: ['./mis-cursos-adquiridos.component.scss']
})
export class MisCursosAdquiridosComponent implements OnInit {

  misCursos: any = [];
  estado = true;
  texto = true;

  constructor(public miscursosSrv: UsuarioService) { }

  ngOnInit(): void {
    this.cursosAdquiridos();
  }

  cursosAdquiridos(): void {
    this.miscursosSrv.misCursos().subscribe(data => {
      console.log(data);
      this.misCursos = data;
      console.log(this.misCursos);
      console.log(this.misCursos.length);
      if (this.misCursos.length !== 0) {
        this.estado = false;
      }
    });
  }

}
