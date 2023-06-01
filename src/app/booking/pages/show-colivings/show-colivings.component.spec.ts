import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowColivingsComponent } from './show-colivings.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('ShowColivingsComponent', () => {
  let component: ShowColivingsComponent;
  let fixture: ComponentFixture<ShowColivingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowColivingsComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowColivingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
