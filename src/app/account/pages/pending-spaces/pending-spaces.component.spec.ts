import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSpacesComponent } from './pending-spaces.component';

describe('PendingSpacesComponent', () => {
  let component: PendingSpacesComponent;
  let fixture: ComponentFixture<PendingSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingSpacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
