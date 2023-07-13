import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMySpaceComponent } from './edit-my-space.component';

describe('EditMySpaceComponent', () => {
  let component: EditMySpaceComponent;
  let fixture: ComponentFixture<EditMySpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMySpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMySpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
