import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { ErrorService } from "src/app/auth/services/error.service";
import { AccountService } from "../../services/account.service";
import { AccountComponent } from "./account.component";
import { NavbarComponent } from "src/app/shared/components/navbar/navbar.component";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let accountService: AccountService;
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
      declarations: [AccountComponent, NavbarComponent, FooterComponent],
      providers: [
        AccountService,
        ErrorService,
        JwtHelperService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    jwtHelperService = TestBed.inject(JwtHelperService);
    errorService = TestBed.inject(ErrorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
