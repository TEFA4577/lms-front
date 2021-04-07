import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comentarios-curso',
  templateUrl: './comentarios-curso.component.html',
  styleUrls: ['./comentarios-curso.component.scss']
})
export class ComentariosCursoComponent implements OnInit {

  formRegistrarComentario: FormGroup;
  datos: any;
  comentarios: any;
  id: number;
  respuesta: any;

  constructor(
    public dialogRef: MatDialogRef<ComentariosCursoComponent>,
    public formBuilder: FormBuilder,
    public serCursos: CursosService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.buildForm();
    this.cargarDatos();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(): void {
    this.formRegistrarComentario = this.formBuilder.group({
      texto_comentario: ['', Validators.required]
    });
  }

  submitRegistrarComentario(event): void {
    event.preventDefault();
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_clase', this.id + '');
    myFormData.append('texto_comentario', this.formRegistrarComentario.get('texto_comentario').value);
    this.serCursos.registarComentario(myFormData).subscribe(res => {
      this.formRegistrarComentario.reset();
      this.cargarDatos();
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      this.onNoClick();
    });
  }

  cargarDatos(): void {
    this.serCursos.mostrarComentario(this.id).subscribe(res => {
      this.comentarios = res;
      console.log(this.comentarios);
    }, error => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
