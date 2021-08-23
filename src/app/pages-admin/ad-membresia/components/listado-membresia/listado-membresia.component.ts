import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MembresiaService } from 'src/app/services/membresia.service';
import { PagoComponent } from '../pago/pago.component';
import { PagoTarjetaComponent } from '../pago/components/pago-tarjeta/pago-tarjeta.component';
import { PagoMoneComponent } from '../pago/components/pago-mone/pago-mone.component';
import { FreeComponent } from '../pago/components/free/free.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-membresia',
  templateUrl: './listado-membresia.component.html',
  styleUrls: ['./listado-membresia.component.scss']
})
export class ListadoMembresiaComponent implements OnInit {
  membresias: any;
  miMemb: any = [];
  solicitudes: any;
  mostrarMetodo = false;
  id: any;
  datos: any;
  constructor(
    public serMembresia: MembresiaService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarMembresia();
  }
  listarMembresia(): void{
    this.serMembresia.listarMembresia().subscribe(resp => {
      this.datos = resp;
      this.membresias = this.datos.membresias;
      this.miMemb = this.datos.docenteMemb;
    });
  }

  metodoDeposito(event) {
    console.log(event);
    const dialogRef = this.dialog.open(PagoComponent, {
      width: '140vh',
      disableClose: true,
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listarMembresia();
      this.router.navigateByUrl('admin/cursos/mis-cursos');
    });
  }
  metodoTarjeta(event) {
    const dialogRef = this.dialog.open(PagoTarjetaComponent, {
      width: '120vh',
      data: {
        id: event,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listarMembresia();
    });
  }
  // tslint:disable-next-line: typedef
  metodoMone(event) {
    const dialogRef = this.dialog.open(PagoMoneComponent, {
      width: '120vh',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listarMembresia();
    });
  }
  metodoFree(event){
    const dialogRef = this.dialog.open(FreeComponent, {
      width: '140vh',
      disableClose: true,
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listarMembresia();
      this.router.navigateByUrl('admin/cursos/mis-cursos');
    });
  }
  openCompra() {
    this.mostrarMetodo = !this.mostrarMetodo;
  }
}
