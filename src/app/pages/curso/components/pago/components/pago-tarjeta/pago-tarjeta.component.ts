import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent implements OnInit {

  formPagoTarjeta: FormGroup;

  @Input()
  id: any;

  constructor(private formBuilder: FormBuilder) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.buildForm();
    console.log(this.id);

  }

  private buildForm(): void {
    this.formPagoTarjeta = this.formBuilder.group({
      nombre_tarjeta: ['', [Validators.required, Validators.maxLength(30)]],
      numero_tarjeta: ['', [Validators.required, Validators.email]],
      mm_aa: ['', [Validators.required, Validators.maxLength(8)]],
      cvc: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }

}
