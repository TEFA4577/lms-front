import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
// import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
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
  idC: any;
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
  progreso: any;
  step = 1;
  pId: any;
  certificadoBoton = true;
  isActive = false;
  constructor(
    public dialogRef: MatDialogRef<EvaluacionCursoComponent>,
    public SerEncuestas: EncuestasService,
    public serEvaluacion: EvaluacionService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    // public serCursos: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data;
  }

  setStep(index: number) {
    this.step = index;
  }

  buildForm(): void {
    this.formRegistrar = this.formBuilder.group({
      texto_prueba_opcion: [false, Validators.requiredTrue]
    });
    // this.setForm();
  }

  // setForm(): void {
  //   this.formRegistrar.get(' texto_prueba_opcion');
  // }

  getId(idP: any) {
    this.pId = idP;
    console.log(this.pId);
  }
  submitRegistrar(event: Event): void {
    console.log(this.id);
    this.isActive = true;
    this.serEvaluacion.evaluarExamen(this.pId, this.id).subscribe(res => {
      this.respuesta = res;
      console.log(res);
      this.message = this.respuesta.mensaje;
      if (this.respuesta.mensaje == "correcta") {
        this.step++;
      } else {
        this.message == "incorrecta";
      }
    });
  }

  mostrarExamen(): void {
    console.log(this.id);
    this.serEvaluacion.darExamen(this.id).subscribe(res => {
      this.prueba = res;
      console.log(this.prueba);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.mostrarExamen();
    this.buildForm();
    //this.closeEv();
  }

  onNoClick(): void {
    this.buildForm();
    this.dialogRef.close();
  }

  closeEv() {
    Swal.fire(
      'Evaluación completa!',
      'La evaluación ha sido concluida satisfactoriamente.',
      'success'
    );
    this.certificadoBoton = true;
  }

  /*closeEv() {
    Swal.fire({
      title: '¿Seguro que deseas acabar tu evaluación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo terminar.',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Evaluación completa!',
          'La evaluación ha sido concluida satisfactoriamente.',
          'success',
        ).finally(() => {
          this.onNoClick();
          this.isActive = false;
        });
      } else if (result.isDenied) {
        Swal.fire('No se envió tu evaluación', '', 'info').finally(() => this.isActive = false);
      }
    });
  }*/
}
