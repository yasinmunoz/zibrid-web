import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowColivingComponent } from './show-coliving.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('ShowColivingComponent', () => {
  let component: ShowColivingComponent;
  let fixture: ComponentFixture<ShowColivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowColivingComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowColivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
