import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.scss']
})
export class EditarEstudianteComponent implements OnInit {
  formUsuario: FormGroup;
  datos: any;
  idUsuario: number;
  datosUsuario: any;
  files: any = [];
  filedata: any;
  estado = false;
  constructor(
    public dialogRef: MatDialogRef<EditarEstudianteComponent>,
    public formBuilder: FormBuilder,
    public srvEstudiante: UsuarioService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idUsuario = data;
  }
  ngOnInit(): void {
    this.comprobarAuth();
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  comprobarAuth(): void {
    if (localStorage.getItem('datosUsuario') !== null) {
      this.datosUsuario = localStorage.getItem('datosUsuario');
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      this.estado = true;
      console.log(this.datosUsuario);
    }
  }
  buildForm(): void {
    this.formUsuario = this.formBuilder.group({
      id_usuario: [this.datosUsuario.id_usuario],
      nombre_usuario: ['', Validators.required],
      correo_usuario: ['', Validators.required],
      password_usuario: ['', Validators.required],
      password_usuario_repeat: ['', Validators.required],
    });
  }

  setForm(): void {
    this.formUsuario.get('nombre_usuario').setValue(this.datos.nombre_usuario);
    this.formUsuario.get('correo_usuario').setValue(this.datos.correo_usuario);
  }

  submitEditarUsuario(event): void {
    event.preventDefault();
    console.log(this.formUsuario.value);
    const myFormData = new FormData();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const id = datos.id_usuario;
    myFormData.append('id_usuario', id);
    this.srvEstudiante.actualizarUsuario(this.formUsuario.value, this.idUsuario).subscribe(res => {
      console.log(res);
    });
  }
}
