import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupActivateComponent } from './signup-activate.component';

describe('SignupActivateComponent', () => {
  let component: SignupActivateComponent;
  let fixture: ComponentFixture<SignupActivateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupActivateComponent]
    });
    fixture = TestBed.createComponent(SignupActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
