import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent implements OnInit {
  formPagoTarjeta: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
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
