import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHouseComponent } from './show-house.component';

describe('ShowHouseComponent', () => {
  let component: ShowHouseComponent;
  let fixture: ComponentFixture<ShowHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
