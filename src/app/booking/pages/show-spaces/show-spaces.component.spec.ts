import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpacesComponent } from './show-spaces.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

describe('ShowSpacesComponent', () => {
  let component: ShowSpacesComponent;
  let fixture: ComponentFixture<ShowSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSpacesComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
