import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MembresiaService } from 'src/app/services/membresia.service';
import { PagoComponent } from '../../pago/pago/pago.component';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent implements OnInit {
  membresias: any;
  mostrarMetodo = false;
  id: any;
  constructor(
    public serMembresia: MembresiaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarMembresia();
  }

  listarMembresia(): void {
    this.serMembresia.listarMembresia().subscribe(resp => {
      this.membresias = resp;
  });
  }
  metodoDeposito() {
    const dialogRef = this.dialog.open(PagoComponent, {
      width: '140vh',
      data: {
        id: this.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // tslint:disable-next-line: typedef
  // metodoTarjeta() {
  //   const dialogRef = this.dialog.open(PagoTarjetaComponent, {
  //     width: '120vh',
  //     data: {
  //       id: this.id,
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  // // tslint:disable-next-line: typedef
  // metodoMone() {
  //   const dialogRef = this.dialog.open(PagoMoneComponent, {
  //     width: '120vh',
  //     data: {
  //       id: this.id,
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  openCompra() {
    this.mostrarMetodo = !this.mostrarMetodo;
  }

}
