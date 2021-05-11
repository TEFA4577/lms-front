import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCursoComponent } from './evaluacion-curso.component';

describe('EvaluacionCursoComponent', () => {
  let component: EvaluacionCursoComponent;
  let fixture: ComponentFixture<EvaluacionCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
