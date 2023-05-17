import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('should return an Observable<any>', () => {
      const userId = 1;
      const dummyUser = { id: 1, name: 'John Doe' };

      service.getUser(userId).subscribe(user => {
        expect(user).toEqual(dummyUser);
      });

      const req = httpMock.expectOne(`http://localhost:3000/api/account/users/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });
  });
});
