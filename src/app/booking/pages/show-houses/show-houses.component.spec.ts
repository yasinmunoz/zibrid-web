import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHousesComponent } from './show-houses.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('ShowHousesComponent', () => {
  let component: ShowHousesComponent;
  let fixture: ComponentFixture<ShowHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHousesComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
