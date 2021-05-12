import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolService } from '../../../../services/rol.service';
import { element } from 'protractor';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  roles: any;
  misRoles: any = [];
  constructor(
    public dialogRef: MatDialogRef<UsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public setUsuarios: RolService,
  ) {
    this.misRoles = data.encuesta_rol;
    console.log(data);
  }
  ngOnInit(): void {
    this.cargarRoles();
  }
  cargarRoles() {
    this.setUsuarios.listarRoles().subscribe(data => {
      this.roles = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  remove(index): void {

    if (index >= 0) {
      this.misRoles.splice(index, 1);
    }
  }
  add(rol) {
    console.log(this.misRoles);
    if (!this.misRoles.includes(rol)) {
      //Si no está un, entonces lo insertamos
      console.log(this.misRoles);
      this.misRoles = this.misRoles.filter(m => m.nombre_rol != rol.nombre_rol)
      this.misRoles.push(rol);
    }
    else {
      //De lo contrario
      console.log("Ya fue seleccionado");
    }
  }
  guardar() {
    this.setUsuarios.eliminarRolEncuesta(this.data.id_encuesta).subscribe(res => {
      this.misRoles.forEach(element => {
        const registro = {
          id_rol: element.id_rol
        }
        this.setUsuarios.registrarRolEncuesta(this.data.id_encuesta, registro).subscribe(res => console.log(res));
      });
      this.onNoClick();
    })
  }

}
