import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../../../../../services/cursos.service';

@Component({
  selector: 'app-crear-modulo',
  templateUrl: './crear-modulo.component.html',
  styleUrls: ['./crear-modulo.component.scss']
})
export class CrearModuloComponent implements OnInit {
  formModulo: FormGroup;
  datos: any;
  modulos: any;
  id: number;
  constructor(
    public dialogRef: MatDialogRef<CrearModuloComponent>,
    public formBuilder: FormBuilder,
    public serCurso: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatosModulo();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formModulo = this.formBuilder.group({
      id_curso: [this.id],
      nombre_modulo: ['', Validators.required],
      descripcion_modulo: ['', Validators.required]
    });
  }
  cargarDatosModulo(): void {
    this.serCurso.presentacionCurso(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.modulos = this.datos.modulos;
    }, error => {
      console.log(error);
    });
  }

  sumitModulos(event): void {
    event.preventDefault();
    console.log(this.formModulo.value);
    this.serCurso.registrarModulo(this.formModulo.value).subscribe(res => {
      console.log(res);
      this.formModulo.reset();
      this.cargarDatosModulo();
      this.onNoClick();
    });
  }

}
