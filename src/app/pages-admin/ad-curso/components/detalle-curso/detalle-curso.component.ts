import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})
export class DetalleCursoComponent implements OnInit {
  id: any;
  mensaje: string;
  datos: any;
  curso: any;
  modulos: [];
  carga = true;
  docente: any;
  rutaVideo: any;
  recursos: any;
  cambioDeEstado = {
    mensaje: '',
    id_usuario: 0,
    estado_curso: '',
    id_curso: 0,
  };
  constructor(
    public dialogRef: MatDialogRef<DetalleCursoComponent>,
    public serCursos: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.cargarDatosCurso();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  seleccionVideo(url): void {
    this.rutaVideo = url;
    this.recursos = null;
  }
  seleccionClase(id): void {
    this.rutaVideo = null;
    this.serCursos.datosClase(id).subscribe(res => {
      console.log(res);
      this.recursos = res;
      this.recursos = this.recursos.recursos;
    });
  }
  cargarDatosCurso(): void {
    this.serCursos.presentacionCurso(this.id).subscribe(data => {
      this.datos = data;
      this.curso = this.datos.curso;
      this.modulos = this.datos.modulos;
      this.docente = this.datos.docente;
      this.carga = false;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  cambiarEstado(estado: string): void {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    const idUsuario = datosUsuario.id_usuario;
    this.cambioDeEstado.id_curso = this.id;
    this.cambioDeEstado.estado_curso = estado;
    this.cambioDeEstado.mensaje = this.mensaje;
    this.cambioDeEstado.id_usuario = idUsuario;
    this.serCursos.cambiarEstadoCurso(this.cambioDeEstado).subscribe(res => {
      console.log(res);
      this.onNoClick();
    }, error => {
      console.log(error);
    });
  }
}
