import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRespuestaComponent } from './editar-respuesta.component';

describe('EditarRespuestaComponent', () => {
  let component: EditarRespuestaComponent;
  let fixture: ComponentFixture<EditarRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
