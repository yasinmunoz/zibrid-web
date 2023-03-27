import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLandlordComponent } from './signup-landlord.component';

describe('SignupLandlordComponent', () => {
  let component: SignupLandlordComponent;
  let fixture: ComponentFixture<SignupLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupLandlordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
