import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
// import { CursosService } from 'src/app/services/cursos.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-evaluacion-curso',
  templateUrl: './evaluacion-curso.component.html',
  styleUrls: ['./evaluacion-curso.component.scss']
})
export class EvaluacionCursoComponent implements OnInit {
  formRegistrar: FormGroup;
  id: number;
  respuesta: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  datosUsuario: any;
  estado: boolean;
  encuesta: any;
  count: any;
  prueba: any;
  resEleccion: string;
  isActive = false;
  step = 0;
  pId: any;
  certificadoBoton = true;
  constructor(
    public dialogRef: MatDialogRef<EvaluacionCursoComponent>,
    public SerEncuestas: EncuestasService,
    public serEvaluacion: EvaluacionService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    // public serCursos: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { this.id = data;}

  setStep(index: number) {
    this.step = index;
  }

  buildForm(): void {
    this.formRegistrar = this.formBuilder.group({
      texto_prueba_opcion: ['', Validators.required]
    });
  }
  getIdP(idP: any) {
    this.pId = idP;
    console.log(this.pId);
    //his.openComentarios(idClase);
  }
  submitRegistrar(event: Event): void {
    this.isActive = true;
    this.serEvaluacion.evaluarExamen(this.pId).subscribe(res => {
      this.respuesta = res;
      this.message = this.respuesta.mensaje;
      if(this.respuesta.mensaje === "correcta"){
        this.step++;
      }
      this.formRegistrar.reset();
    });
  }

  mostrarExamen(): void {
    this.serEvaluacion.darExamen(this.id).subscribe(res => {
      console.log(res);
      console.log(this.id);
      this.prueba = res;
    }, error => {
      console.log(error);
    });
  }
  ngOnInit(): void {
    this.mostrarExamen();
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // verCertificado() {
  //   console.log(this.id);
  //   this.serCursos.certificado(this.id).subscribe(res => {
  //     console.log(res);
  //   }, error => console.log(error))
  // }
}
