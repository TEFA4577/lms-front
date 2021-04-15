import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDepositoComponent } from './pago-deposito.component';

describe('PagoDepositoComponent', () => {
  let component: PagoDepositoComponent;
  let fixture: ComponentFixture<PagoDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
