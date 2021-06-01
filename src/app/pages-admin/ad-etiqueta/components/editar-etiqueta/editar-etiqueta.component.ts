import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtiquetaService } from '../../../../services/etiqueta.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-etiqueta',
  templateUrl: './editar-etiqueta.component.html',
  styleUrls: ['./editar-etiqueta.component.scss']
})
export class EditarEtiquetaComponent implements OnInit {
  formEtiqueta: FormGroup;
  imagenCambio: any;
  datos: any;
  id: number;
  files: any = [];
  filedata: any;
  respuesta: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialogRef: MatDialogRef<EditarEtiquetaComponent>,
    public formBuilder: FormBuilder,
    public serEtiqueta: EtiquetaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
    console.log(data);
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatos();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formEtiqueta = this.formBuilder.group({
      nombre_etiqueta: ['', Validators.required],
      descripcion_etiqueta: ['', Validators.required]
    });
  }
  setForm(): void {
    this.formEtiqueta.get('nombre_etiqueta').setValue(this.datos.nombre_etiqueta);
    this.formEtiqueta.get('descripcion_etiqueta').setValue(this.datos.descripcion_etiqueta);
  }
  submitEtiqueta(event): void {
    event.preventDefault();
    const myFormData = new FormData();
    myFormData.append('_method', 'put');
    myFormData.append('imagen_etiqueta', this.filedata);
    myFormData.append('nombre_etiqueta', this.formEtiqueta.get('nombre_etiqueta').value);
    myFormData.append('descripcion_etiqueta', this.formEtiqueta.get('descripcion_etiqueta').value);
    console.log(this.formEtiqueta.value);
    this.serEtiqueta.actualizarEtiqueta(this.id, myFormData).subscribe(res => {
      console.log(res);
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.formEtiqueta.reset();
      this.cargarDatos();
      this.onNoClick();
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  /*cambiarImagen(): void {
    const myFormData = new FormData();
    myFormData.append('id_etiqueta', this.id + '');
    myFormData.append('imagen_etiqueta', this.filedata);
    this.serEtiqueta.cambiarImagenEtiqueta(myFormData).subscribe(res => {
      console.log(res);
      this.deleteAttachment(0);
      this.cargarDatos();
    });
  }*/
  cargarDatos(): void {
    this.serEtiqueta.mostarEtiqueta(this.id).subscribe(res => {
      console.log(res);
      this.datos = res;
      this.setForm();
    });
  }
  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      this.deleteAttachment(index);
      const element = event[index];
      this.files.push(element.name);
      this.filedata = element;
      console.log(element);
      const reader = new FileReader();
      reader.readAsDataURL(event[index]);
      reader.onload = (_event) => {
        this.imagenCambio = reader.result;
      }
    }
    console.log(this.files);
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
    this.imagenCambio = false;
  }

}
