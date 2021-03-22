import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMembresiaComponent } from './editar-membresia.component';

describe('EditarMembresiaComponent', () => {
  let component: EditarMembresiaComponent;
  let fixture: ComponentFixture<EditarMembresiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMembresiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
