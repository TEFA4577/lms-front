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

  constructor(
    public route: ActivatedRoute,
    public serDocente: DocentesService) {}

  ngOnInit(): void {
    this.mostrarDocentes();
  }
 // tslint:disable-next-line: typedef
 mostrarDocentes(){
    this.serDocente.listarDocente().subscribe(data => {
      this.docente = data;
      console.log(data);
    });
  }
}
