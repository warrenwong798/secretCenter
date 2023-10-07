import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingComponent } from './rolling.component';

describe('RollingComponent', () => {
  let component: RollingComponent;
  let fixture: ComponentFixture<RollingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RollingComponent]
    });
    fixture = TestBed.createComponent(RollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
