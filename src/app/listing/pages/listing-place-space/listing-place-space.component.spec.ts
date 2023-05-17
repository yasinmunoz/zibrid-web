import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'; // importar el servicio

import { ListingPlaceSpaceComponent } from './listing-place-space.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ListingService } from '../../services/listing.service';
import { ErrorService } from 'src/app/auth/services/error.service';

describe('ListingPlaceSpaceComponent', () => {
  let component: ListingPlaceSpaceComponent;
  let fixture: ComponentFixture<ListingPlaceSpaceComponent>;

  let listingService: ListingService;
  let jwtHelperService: JwtHelperService;
  let errorService: ErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
            allowedDomains: ['localhost:3000', '3.69.12.0:3000']
          }
        })
      ],
      declarations: [ListingPlaceSpaceComponent, NavbarComponent, FooterComponent],
      providers: [
        ListingService,
        ErrorService,
        JwtHelperService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListingPlaceSpaceComponent);
    component = fixture.componentInstance;
    listingService = TestBed.inject(ListingService);
    jwtHelperService = TestBed.inject(JwtHelperService);
    errorService = TestBed.inject(ErrorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
