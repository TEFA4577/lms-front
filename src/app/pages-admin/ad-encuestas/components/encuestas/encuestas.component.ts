import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearEncuestaComponent } from '../../components/crear-encuesta/crear-encuesta.component';
import { EditarEncuestaComponent } from '../../components/editar-encuesta/editar-encuesta.component';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  crearEncuesta(): void {
    const dialogRef = this.dialog.open(CrearEncuestaComponent, {
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.cargarPreguntas();
    });
  }

}
