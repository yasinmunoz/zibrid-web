import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoworkingComponent } from './show-coworking.component';

describe('ShowCoworkingComponent', () => {
  let component: ShowCoworkingComponent;
  let fixture: ComponentFixture<ShowCoworkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCoworkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCoworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
