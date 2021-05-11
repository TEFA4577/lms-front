import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from '../../../../services/rol.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  roles: any;
  misRoles: any[];

  constructor(
    public dialogRef: MatDialogRef<UsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serEtiqueta: RolService,
  ) {
    //this.misRoles = data.nombre_rol;
    console.log(data);
  }

  ngOnInit(): void {
    this.cargarRoles();
  }
  cargarRoles() {
    this.serEtiqueta.listarRoles().subscribe(data => {
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
      this.misRoles = this.misRoles.filter(m => m.nombre_etiqueta != rol.nombre_rol)
      this.misRoles.push(rol);


    }
    else {
      //De lo contrario
      console.log("Ya fue seleccionado");
    }
  }
  /*guardar() {
    this.serEtiqueta.eliminarEtiquetasCurso(this.data.id_curso).subscribe(res => {
      this.misEtiquetas.forEach(element => {
        const registro = {
          id_etiqueta: element.id_etiqueta
        }
        this.serEtiqueta.registrarEtiquetaCurso(this.data.id_curso, registro).subscribe(res => console.log(res));
      });
      this.onNoClick();
    })
  }*/

}
