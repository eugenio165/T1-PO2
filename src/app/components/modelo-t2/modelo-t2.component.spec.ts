import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloT2Component } from './modelo-t2.component';

describe('ModeloT2Component', () => {
  let component: ModeloT2Component;
  let fixture: ComponentFixture<ModeloT2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloT2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloT2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
