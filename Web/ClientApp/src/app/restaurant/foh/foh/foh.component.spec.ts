import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FohComponent } from './foh.component';

describe('FohComponent', () => {
  let component: FohComponent;
  let fixture: ComponentFixture<FohComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FohComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
