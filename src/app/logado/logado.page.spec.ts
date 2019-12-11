import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogadoPage } from './logado.page';

describe('LogadoPage', () => {
  let component: LogadoPage;
  let fixture: ComponentFixture<LogadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
