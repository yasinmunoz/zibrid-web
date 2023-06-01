import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowApartmentsComponent } from './show-apartments.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('ShowApartmentsComponent', () => {
  let component: ShowApartmentsComponent;
  let fixture: ComponentFixture<ShowApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowApartmentsComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
