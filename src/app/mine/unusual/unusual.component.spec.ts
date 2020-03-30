import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusualComponent } from './unusual.component';

describe('UnusualComponent', () => {
  let component: UnusualComponent;
  let fixture: ComponentFixture<UnusualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnusualComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
