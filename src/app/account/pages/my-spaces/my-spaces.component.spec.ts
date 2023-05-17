import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpacesComponent } from './my-spaces.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('MySpacesComponent', () => {
  let component: MySpacesComponent;
  let fixture: ComponentFixture<MySpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpacesComponent, NavbarComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
