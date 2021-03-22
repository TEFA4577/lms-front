import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearMembresiaComponent } from '../../crear-membresia/crear-membresia/crear-membresia.component';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  adquirirMembresia(): void {
    const dialogRef = this.dialog.open(CrearMembresiaComponent, {
      width: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Cerrado');
    });
  }

}
