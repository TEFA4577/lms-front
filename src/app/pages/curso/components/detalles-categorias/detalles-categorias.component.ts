import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtiquetaService } from '../../../../services/etiqueta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-categorias',
  templateUrl: './detalles-categorias.component.html',
  styleUrls: ['./detalles-categorias.component.scss']
})
export class DetallesCategoriasComponent implements OnInit {

  id: any;
  categorias: any = [];
  estado = true;
  texto = true;

  constructor(public cursoCategoria: EtiquetaService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.route.snapshot.params.id;
    this.mostrarCursoCategoria();
  }

  mostrarCursoCategoria() {
    this.cursoCategoria.mostrarEtiquetaCurso(this.id).subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);
      if (this.categorias.length !== 0) {
        this.estado = false;
      }
    })
  }
}
