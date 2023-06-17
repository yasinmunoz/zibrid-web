import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSpaceComponent } from './pending-space.component';

describe('PendingSpaceComponent', () => {
  let component: PendingSpaceComponent;
  let fixture: ComponentFixture<PendingSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
