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
  isActive = false;
  step = 1;
  constructor(
    public dialogRef: MatDialogRef<EvaluacionCursoComponent>,
    public SerEncuestas: EncuestasService,
    public serEvaluacion: EvaluacionService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { this.id = data;}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
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
    this.isActive = true;
    const myFormData = new FormData();
    myFormData.append('texto_prueba_opcion', this.formRegistrar.get('texto_prueba_opcion').value);
    this.serEvaluacion.evaluarExamen(myFormData).subscribe(res => {
      const obj: any = res;
      this.respuesta = res;
      console.log(res);
      this.onNoClick();
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
