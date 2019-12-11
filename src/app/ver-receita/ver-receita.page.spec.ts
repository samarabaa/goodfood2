import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReceitaPage } from './ver-receita.page';

describe('VerReceitaPage', () => {
  let component: VerReceitaPage;
  let fixture: ComponentFixture<VerReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
