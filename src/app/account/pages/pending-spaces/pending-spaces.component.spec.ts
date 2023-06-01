import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSpacesComponent } from './pending-spaces.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('PendingSpacesComponent', () => {
  let component: PendingSpacesComponent;
  let fixture: ComponentFixture<PendingSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingSpacesComponent, NavbarComponent, FooterComponent ]
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
