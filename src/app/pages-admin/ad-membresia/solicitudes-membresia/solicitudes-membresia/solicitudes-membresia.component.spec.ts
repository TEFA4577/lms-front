import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesMembresiaComponent } from './solicitudes-membresia.component';

describe('SolicitudesMembresiaComponent', () => {
  let component: SolicitudesMembresiaComponent;
  let fixture: ComponentFixture<SolicitudesMembresiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesMembresiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
