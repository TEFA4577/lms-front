import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrEstaticoComponent } from './qr-estatico.component';

describe('QrEstaticoComponent', () => {
  let component: QrEstaticoComponent;
  let fixture: ComponentFixture<QrEstaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrEstaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrEstaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
