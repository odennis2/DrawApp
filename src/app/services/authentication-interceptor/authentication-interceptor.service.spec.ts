import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { AuthInterceptor } from './authentication-interceptor.service';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with Bearer token', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(authService, 'getAuthToken').and.returnValue('test-token');

      http.get('/api/data').subscribe();

      const req = httpMock.expectOne('/api/data');

      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe(
        'Bearer test-token',
      );

      req.flush({});
    },
  ));

  it('should handle 401 Unauthorized and logout', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(authService, 'getAuthToken').and.returnValue('test-token');
      spyOn(authService, 'logout');

      http.get('/api/data').subscribe(
        () => {},
        (error) => {
          expect(error).toBeTruthy();
        },
      );

      const req = httpMock.expectOne('/api/data');

      req.flush('', {
        status: 401,
        statusText: 'Unauthorized',
      });

      expect(authService.logout).toHaveBeenCalled();
    },
  ));

  it('should handle other errors and propagate them', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(authService, 'getAuthToken').and.returnValue('test-token');

      http.get('/api/data').subscribe(
        () => {},
        (error) => {
          expect(error).toBeTruthy();
        },
      );
      const req = httpMock.expectOne('/api/data');
      req.flush('', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    },
  ));
});
