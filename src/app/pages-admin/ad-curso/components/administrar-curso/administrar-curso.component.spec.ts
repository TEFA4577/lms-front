import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCursoComponent } from './administrar-curso.component';

describe('AdministrarCursoComponent', () => {
  let component: AdministrarCursoComponent;
  let fixture: ComponentFixture<AdministrarCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
