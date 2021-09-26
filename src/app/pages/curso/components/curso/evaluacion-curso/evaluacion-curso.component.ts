import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  mensaje: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  datosUsuario: any;
  estado: boolean;
  estadoP: string;
  count: any;
  prueba: any;
  datos: any;
  progreso: any;
  step = 1;
  pId: any;
  isActive = false;
  constructor(
    public dialogRef: MatDialogRef<EvaluacionCursoComponent>,
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
    //console.log(this.pId);
  }
  submitRegistrar(event: Event): void {
    console.log(this.id);
    this.serEvaluacion.evaluarExamen(this.pId, this.id).subscribe(res => {
      this.respuesta = res;
      //console.log(res);
      this.step++;
    });
  }

  mostrarExamen(): void {
    //console.log(this.id);
    this.serEvaluacion.darExamen(this.id).subscribe(res => {
     // console.log(res);
      this.datos = res;
      this.prueba = this.datos.prueba;
      this.mensaje = this.datos.mensaje;
      this.estadoP = this.datos.estado;
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

  closeEv(): void {
    Swal.fire({
      title: '¿Seguro que desea ENVIAR a revisión?',
      text: 'La evaluación será concluida.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo enviar',
      cancelButtonText: 'No, cancelar!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serEvaluacion.progresoEvaluacion(this.id).subscribe(res => {
          //console.log(this.prueba);
          //console.log(res);
          this.progreso = res;
          Swal.fire({
            title: this.progreso.mensaje,
            icon: this.progreso.estado
          });
        }, error => {
          //console.log(error);
        });
      }
    });
  }
}
