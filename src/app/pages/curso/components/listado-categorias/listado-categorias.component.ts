import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtiquetaService } from '../../../../services/etiqueta.service';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.scss']
})
export class ListadoCategoriasComponent implements OnInit {

  etiquetas: any;

  @Input()
  // tslint:disable-next-line: no-unused-expression
  id: any;

  constructor(
    public route: ActivatedRoute,
    public setEtiqueta: EtiquetaService
  ) { }

  ngOnInit(): void {
    this.mostrarEtiquetas();
  }
  mostrarEtiquetas() {
    this.setEtiqueta.listarEtiquetas().subscribe(data => {
      this.etiquetas = data;
      console.log(data);
    });
  }
}
