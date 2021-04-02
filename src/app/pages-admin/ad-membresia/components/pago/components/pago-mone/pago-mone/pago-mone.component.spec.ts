import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMoneComponent } from './pago-mone.component';

describe('PagoMoneComponent', () => {
  let component: PagoMoneComponent;
  let fixture: ComponentFixture<PagoMoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
