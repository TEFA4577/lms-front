import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMembresiaComponent } from './listado-membresia.component';

describe('ListadoMembresiaComponent', () => {
  let component: ListadoMembresiaComponent;
  let fixture: ComponentFixture<ListadoMembresiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMembresiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
