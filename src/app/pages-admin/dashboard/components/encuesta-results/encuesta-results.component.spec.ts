import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaResultsComponent } from './encuesta-results.component';

describe('EncuestaResultsComponent', () => {
  let component: EncuestaResultsComponent;
  let fixture: ComponentFixture<EncuestaResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
