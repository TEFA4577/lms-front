import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-editar-membresia',
  templateUrl: './editar-membresia.component.html',
  styleUrls: ['./editar-membresia.component.scss']
})
export class EditarMembresiaComponent implements OnInit {
  formEditarMembresia: FormGroup;
  datos: any;
  membresias: any;
  id: number;
  respuesta: any;
  constructor(
    public dialogRef: MatDialogRef<EditarMembresiaComponent>,
    public formBuilder: FormBuilder,
    public serMembresia: MembresiaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)public data:number
  ) {
    this.id = data;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatos();
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  buildForm(): void {
    this.formEditarMembresia = this.formBuilder.group({
      nombre_membresia: ['', Validators.required],
      texto_membresia: ['', Validators.required],
      precio_membresia: ['', Validators.required]
    });
  }

  setForm(): void {
    this.formEditarMembresia.get('nombre_membresia').setValue(this.datos.nombre_membresia);
    this.formEditarMembresia.get('texto_membresia').setValue(this.datos.texto_membresia);
    this.formEditarMembresia.get('precio_membresia').setValue(this.datos.precio_membresia);
  }

  cargarDatos(): void {
    this.serMembresia.datosMembresia(this.id).subscribe(res => {
      this.datos = res;
      this.membresias = this.datos.membresias;
      this.setForm();
    }, error => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  submitEditarMembresia(event): void{
    event.preventDefault();
    console.log(this.formEditarMembresia.value);
    this.serMembresia.actualizarMembresia(this.id, this.formEditarMembresia.value).subscribe(res => {
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.formEditarMembresia.reset();
      this.cargarDatos();
      this.onNoClick();
    });
  }
}
