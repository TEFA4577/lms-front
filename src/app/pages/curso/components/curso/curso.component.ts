import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ComentariosCursoComponent } from './comentarios-curso/comentarios-curso.component';
import { RespuestasCursoComponent } from './respuestas-curso/respuestas-curso.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit, OnDestroy {
  API_BACKEND = environment.urlBackend + 'certificado/';

  id: any;
  idClase: any;
  clasesId: any
  datos: any;
  clasesModulo: any;
  curso: any;
  modulos: any;
  certificado: any;
  foro:any;
  estado = true;
  rutaVideo: string;
  clase: any;
  recursos: any;
  comentarios: any;
  count: any;
  progreso: any;
  formRegistrarComentario: any;
  formRegistrarRespuesta: any;
  rutaRecurso: string;
  showButtons = false;
  showComments = false;
  dat: any;
  data: any;
  certificadoBoton = false;
  idRes: any;
  estadoCargando = false;
  respuesta: any;
  panelOpenState = false;

  constructor(
    public serCursos: CursosService,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.id;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
    this.buildForm();
    this.respuestaForm();
  }

  getData() {
    this.serCursos.cursarCurso(this.id).subscribe(data => {
      console.log(data);
      this.datos = data;
      this.clasesModulo = this.datos.modulos;
      this.curso = this.datos.curso;
      this.modulos = this.datos.modulos;
      this.foro = this.openComentarios;
      this.progreso = JSON.parse(this.datos.cursoUsuario.progreso_curso);
      this.certificado =  this.datos.cursoUsuario.id_usuario_curso;
      console.log(this.certificado);
      console.log(this.progreso);
      console.log(this.clasesModulo);
      this.estado = false;
      this.progresoBarra();
    });
  }

  cambios(index, valor: { index; valor: boolean; }) {
    console.log(index, valor);
    this.progreso[index].estado = !valor;
    console.log(this.progreso);
    this.progresoBarra();
  }

  progresoBarra() {
    const conteo = this.progreso.filter(res => res.estado === true);
    this.count = (conteo.length * 100) / this.progreso.length;
    console.log(this.count);
    if (this.count == 100) {
      this.certificadoBoton = true;
    }
  }

  // esta funcion abre y muestra los recursos de la clase
  getClase(identificador) {
    this.serCursos.presentacionClase(identificador).subscribe(data => {
      console.log(data);
      this.datos = data;
      this.recursos = this.datos.recursos;
      console.log(this.recursos);
      if (this.recursos.length !== 0) {
        this.estado = false;
      }
    });
  }

  buildForm(): void {
    this.formRegistrarComentario = this.formBuilder.group({
      texto_comentario: ['', Validators.required]
    });
  }

  respuestaForm(): void {
    this.formRegistrarRespuesta = this.formBuilder.group({
      texto_respuesta: ['', Validators.required]
    });
  }

  //obtengo el id de la clase
  getIdClase(idClase: any) {
    this.clasesId = idClase;
    console.log(this.clasesId);
    this.openComentarios(idClase);
  }

  //muestra los comentarios por clase
  openComentarios(comments){
    this.serCursos.mostrarComentario(comments).subscribe(res => {
      this.dat = res;
      console.log(this.dat);
    }, error => {
      console.log(error);
    });
  }

  openDialog(idC: number): void {
    const dialogRef = this.dialog.open(ComentariosCursoComponent, {
      data: idC,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.openComentarios(idC);
    });
  }

  openRespuestas(idR: number): void {
    const dialogRef = this.dialog.open(RespuestasCursoComponent, {
      data: idR,
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(idR);
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.serCursos.comentario().subscribe(res => {
      this.dat = res;
      console.log(this.dat);
    }, error => {
      console.log(error);
    });
  }

  changed() {
    this.count = 0;
    this.modulos.forEach(item => {
      console.log(item);
      if (item.checked) {
        this.count = this.count + 1;
        console.log(this.count);
      }
    });
  }

  //, idClase: any
  setVideo(ruta: string, idClase: any) {
    this.rutaVideo = ruta;
    this.clasesId = idClase;
    this.getClase(idClase);
    console.log(this.rutaVideo);
  }

  ngOnDestroy() {
    const progres = {
      'progreso_curso': JSON.stringify(this.progreso),
    };
    console.log(progres);
    this.serCursos.progresoCurso(progres, this.id).subscribe(res => {
      console.log(res);
    }, error => console.log(error))
  }

  verCertificado() {
    console.log(this.id);
    this.serCursos.certificado(this.id).subscribe(res => {
      console.log(res);
    }, error => console.log(error))
  }
}
