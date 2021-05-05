import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtiquetaService } from '../../../../services/etiqueta.service';
import { element } from 'protractor';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.scss']
})
export class EtiquetasComponent implements OnInit {
  etiquetas: any;
  misEtiquetas: any = [];
  constructor(
    public dialogRef: MatDialogRef<EtiquetasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serEtiqueta: EtiquetaService,
  ) {
    // this.misEtiquetas=this.misEtiquetas.concat(data.etiquetas_curso);
    this.misEtiquetas = data.etiquetas_curso;
  }

  ngOnInit(): void {
    this.cargarEtiquetas();
  }
  cargarEtiquetas() {
    this.serEtiqueta.listarEtiquetas().subscribe(data => {
      this.etiquetas = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  remove(index): void {

    if (index >= 0) {
      this.misEtiquetas.splice(index, 1);
    }
  }
  add(etiqueta) {
    console.log(this.misEtiquetas);
    if (!this.misEtiquetas.includes(etiqueta)) {
      //Si no está un, entonces lo insertamos
      this.misEtiquetas = this.misEtiquetas.filter(m => m.nombre_etiqueta != etiqueta.nombre_etiqueta)
      this.misEtiquetas.push(etiqueta);


    }
    else {
      //De lo contrario
      console.log("Ya fue seleccionado");
    }
  }
  guardar() {
    this.serEtiqueta.eliminarEtiquetasCurso(this.data.id_curso).subscribe(res => {
      this.misEtiquetas.forEach(element => {
        const registro = {
          id_etiqueta: element.id_etiqueta
        }
        this.serEtiqueta.registrarEtiquetaCurso(this.data.id_curso, registro).subscribe(res => console.log(res));
      });
      this.onNoClick();
    })
  }
}
