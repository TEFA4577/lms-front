import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  datosUsuario: any;
  estado: boolean;
  encuesta: any;
  prueba: any;
  resEleccion: string;
  //misRespuestas: string[] = ['Si', 'No'];
  misRespuestas: any = [];
  pId: any
  isActive = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    public dialogRef: MatDialogRef<EvaluacionCursoComponent>,
    public SerEncuestas: EncuestasService,
    public serEvaluacion: EvaluacionService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: number
    ) { this.id = data;}

  getIdP(idP: any) {
    this.pId = idP;
    console.log(this.pId);
    //his.openComentarios(idClase);
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  buildForm(): void {
    this.formRegistrar = this.formBuilder.group({
      texto_prueba_opcion: ['', Validators.required]
    });
    this.setForm();
  }

  setForm(): void {
    this.formRegistrar.get('texto_prueba_opcion');
  }

  submitRegistrar(event: Event): void {
    event.preventDefault();
    console.log(this.formRegistrar.value);
    const myFormData = new FormData();
    myFormData.append('texto_prueba_opcion', this.formRegistrar.get('texto_prueba_opcion').value);
    this.serEvaluacion.evaluarExamen(myFormData).subscribe(res => {
      const obj: any = res;
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
