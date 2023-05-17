import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;
  let toastrService: ToastrService;

  beforeEach(() => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        ErrorService,
        {
          provide: ToastrService,
          useValue: toastrServiceSpy
        }
      ]
    });
    service = TestBed.inject(ErrorService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display error message when HttpErrorResponse contains msg property', () => {
    const errorResponse = new HttpErrorResponse({
      error: {
        msg: 'Error message'
      }
    });

    service.msgError(errorResponse);

    expect(toastrService.error).toHaveBeenCalledWith('Error message', 'Error');
  });

  it('should display default error message when HttpErrorResponse does not contain msg property', () => {
    const errorResponse = new HttpErrorResponse({});

    service.msgError(errorResponse);

    expect(toastrService.error).toHaveBeenCalledWith('UPPS ocurrió un error, comuníquese con el administrador.', 'Error');
  });
});
