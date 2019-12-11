import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReceitasPage } from './editar-receitas.page';

describe('EditarReceitasPage', () => {
  let component: EditarReceitasPage;
  let fixture: ComponentFixture<EditarReceitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarReceitasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReceitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
