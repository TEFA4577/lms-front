import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEvaluacionesComponent } from './ad-evaluaciones.component';

describe('AdEvaluacionesComponent', () => {
  let component: AdEvaluacionesComponent;
  let fixture: ComponentFixture<AdEvaluacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdEvaluacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
