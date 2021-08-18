import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  formRegistrarRespuesta: FormGroup;
  datos: any;
  comentarios: any;
  id: number;
  respuesta: any;
  estadoCargando = false;

  constructor(
    public dialogRef: MatDialogRef<CommentsComponent>,
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
    this.formRegistrarRespuesta = this.formBuilder.group({
      texto_respuesta: ['', Validators.required]
    });
  }

  submitRegistrarRespuesta(event): void {
    event.preventDefault();
    this.estadoCargando = true;
    console.log(this.formRegistrarRespuesta.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_comentario', this.id + '');
    myFormData.append('texto_respuesta', this.formRegistrarRespuesta.get('texto_respuesta').value);
    this.serCursos.registrarRespuesta(myFormData).subscribe(res => {
      console.log(res);
      this.formRegistrarRespuesta.reset();
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
