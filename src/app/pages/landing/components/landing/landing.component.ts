import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestasService } from '../../../../services/encuestas.service';
import { UsuarioService } from '../../../../services/usuario.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { elementAt } from 'rxjs/operators';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  formRegistrarRespuesta: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  respuesta: any;
  datosUsuario: any;
  estado: boolean;
  encuesta: any;
  resEleccion: string;
  //misRespuestas: string[] = ['Si', 'No'];
  misRespuestas: any = [];

  constructor(
    public SerEncuestas: EncuestasService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,

  ) { }

  ngOnInit(): void {
    this.listarEncuestas();
    this.buildForm();
    this.comprobarAuth();
  }

  comprobarAuth(): void {
    this.estado = this.usuarioService.estadoSession();
    if (this.estado) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    }
    console.log(this.estado);
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  buildForm(): void {
    this.formRegistrarRespuesta = this.formBuilder.group({
      texto_encuesta_respuesta: ['', Validators.required]
    });
    this.setForm();
  }

  setForm(): void {
    this.formRegistrarRespuesta.get('texto_encuesta_respuesta');
  }

  submitRegistrar(event: Event): void {
    event.preventDefault();
    console.log(this.formRegistrarRespuesta.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    myFormData.append('id_encuesta_pregunta', '2');
    myFormData.append('texto_encuesta_respuesta', this.formRegistrarRespuesta.get('texto_encuesta_respuesta').value);
    this.SerEncuestas.registrarRespuesta(myFormData).subscribe(res =>{
      const obj: any = res;
      localStorage.setItem('datosUsuario', JSON.stringify(obj.datosUsuario));
      this.respuesta = res;
      this.openSnackBar(this.respuesta.mensaje, 'cerrar');
      console.log(res);
    });
  }

  listarEncuestas() {
    this.SerEncuestas.listarEncuestas().subscribe(data => {
      console.log(data);
      this.encuesta = data;
    });
  }

}
