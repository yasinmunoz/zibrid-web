import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListingFinishSpaceComponent } from './listing-finish-space.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

describe('ListingFinishSpaceComponent', () => {
  let component: ListingFinishSpaceComponent;
  let fixture: ComponentFixture<ListingFinishSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListingFinishSpaceComponent, NavbarComponent, FooterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingFinishSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to account page when goToAccount method is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    component.goToAccount();
    expect(routerSpy).toHaveBeenCalledWith(['/account']);
  });
});
