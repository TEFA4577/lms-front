import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEstadoCursoComponent } from './administrar-estado-curso.component';

describe('AdministrarEstadoCursoComponent', () => {
  let component: AdministrarEstadoCursoComponent;
  let fixture: ComponentFixture<AdministrarEstadoCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarEstadoCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEstadoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
