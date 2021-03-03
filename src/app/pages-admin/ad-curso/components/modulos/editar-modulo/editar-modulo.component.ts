import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-editar-modulo',
  templateUrl: './editar-modulo.component.html',
  styleUrls: ['./editar-modulo.component.scss']
})
export class EditarModuloComponent implements OnInit {
  formModulo: FormGroup;
  datos: any;
  modulos: any;
  id: number;
  constructor(
    public dialogRef: MatDialogRef<EditarModuloComponent>,
    public formBuilder: FormBuilder,
    public serCurso: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(this.id);
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
      id_modulo: [this.id],
      nombre_modulo: ['', Validators.required],
      descripcion_modulo: ['', Validators.required]
    });
  }
  setForm(): void {
    this.formModulo.get('nombre_modulo').setValue(this.modulos.nombre_modulo);
    this.formModulo.get('descripcion_modulo').setValue(this.modulos.descripcion_modulo);
  }
  cargarDatosModulo(): void {
    this.serCurso.datosModulo(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.modulos = this.datos.modulo;
      this.setForm();
    }, error => {
      console.log(error);
    });
  }

  sumitModulos(event): void {
    event.preventDefault();
    console.log(this.formModulo.value);
    this.serCurso.actualizarModulo(this.formModulo.value, this.id).subscribe(res => {
      console.log(res);
      this.formModulo.reset();
      this.cargarDatosModulo();
      this.onNoClick();
    });
  }

}
