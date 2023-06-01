import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoworkingsComponent } from './show-coworkings.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('ShowCoworkingsComponent', () => {
  let component: ShowCoworkingsComponent;
  let fixture: ComponentFixture<ShowCoworkingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCoworkingsComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCoworkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
