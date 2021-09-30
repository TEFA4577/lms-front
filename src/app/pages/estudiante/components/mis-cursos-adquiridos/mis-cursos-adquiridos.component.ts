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
  datosUsuario: any;

  constructor(public miscursosSrv: UsuarioService) { }

  ngOnInit(): void {
    this.cursosAdquiridos();
    this.comprobarAuth();
  }

  comprobarAuth(): void {
    this.estado = this.miscursosSrv.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    console.log(this.estado);
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
