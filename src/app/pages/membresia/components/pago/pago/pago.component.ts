import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  providers: [
    UsuarioService,
    {
      provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class PagoComponent implements OnInit {
  formPago: FormGroup;
  estado = false;
  datosUsuario: any;
  isActive = false;
  isLinear = false;
  respuesta: any;
  step = 0;
  metodo: string;
  constructor(
    public srvEstudiante: UsuarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit(): void {
    this.comprobarAuth();
    this.buildForm();
  }
  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      this.estado = true;
      console.log(this.datosUsuario);
    }
  }
  setForm(): void {
    this.formPago.get('nombre_usuario').setValue(this.datosUsuario.nombre_usuario);
    this.formPago.get('correo_usuario').setValue(this.datosUsuario.correo_usuario);
  }
  buildForm(): void {
    this.formPago = this.formBuilder.group({
      nombre_usuario: ['', [Validators.required, Validators.maxLength(30)]],
      correo_usuario: ['', [Validators.required, Validators.email]]
    });
    this.setForm();
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  submitEditarUsuario(event: Event): void {
    event.preventDefault();
    console.log(this.formPago.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('_method', 'put');
    myFormData.append('nombre_usuario', this.formPago.get('nombre_usuario').value);
    myFormData.append('correo_usuario', this.formPago.get('correo_usuario').value);
    this.srvEstudiante.actualizarUsuario(myFormData, id).subscribe(res =>{
      const obj: any = res;
      localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
    });
  }
}
