import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSpaceComponent } from './detail-space.component';

describe('DetailSpaceComponent', () => {
  let component: DetailSpaceComponent;
  let fixture: ComponentFixture<DetailSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
