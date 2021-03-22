import { Component, OnInit } from '@angular/core';
import { MembresiaService } from 'src/app/services/membresia.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-crear-membresia',
  templateUrl: './crear-membresia.component.html',
  styleUrls: ['./crear-membresia.component.scss']
})
export class CrearMembresiaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CrearMembresiaComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
