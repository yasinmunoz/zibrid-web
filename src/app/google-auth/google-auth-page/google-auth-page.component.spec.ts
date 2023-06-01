import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthPageComponent } from './google-auth-page.component';

describe('GoogleAuthPageComponent', () => {
  let component: GoogleAuthPageComponent;
  let fixture: ComponentFixture<GoogleAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAuthPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
