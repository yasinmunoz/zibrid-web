import { TestBed } from '@angular/core/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ListingGuard } from './listing.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ListingGuard', () => {
  let guard: ListingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      providers: [
        ListingGuard,
        JwtHelperService
      ]
    });
    guard = TestBed.inject(ListingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
