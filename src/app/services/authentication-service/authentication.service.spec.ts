import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { AuthModel, AuthResponse, AuthError } from 'src/app/models/auth-model';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, HttpClientModule],
    });

    authService = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should authenticate a user', () => {
    const authData: AuthModel = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse: AuthResponse = {
      token: 'mock-token',
      userId: 'userId',
    };

    authService.authenticate(authData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`https://localhost:7103/api/Auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    httpTestingController.verify();
  });

  it('should handle authentication error', () => {
    const authData: AuthModel = {
      email: 'test@example.com',
      password: 'password123',
    };

    authService.authenticate(authData).subscribe(
      (response) => {
        fail('Expected an error response but received a success response.');
      },
      (error) => {
        expect(error.status).toBe(401);
        expect(error.error.message).toBe('Authentication failed');
      },
    );

    const req = httpTestingController.expectOne(`https://localhost:7103/api/Auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(
      { message: 'Authentication failed' },
      { status: 401, statusText: 'Unauthorized' },
    );

    httpTestingController.verify();
  });

  it('should sign up a user', () => {
    const authData: AuthModel = {
      email: 'test@example.com',
      password: 'password123',
    };

    const co2ProfileForm = {
      // Provide the Co2 profile form data here
    };

    const mockResponse: AuthResponse = {
      token: 'mock-token',
      userId: 'userId',
    };

    authService.signup(authData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`https://localhost:7103/api/Auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    httpTestingController.verify();
  });

  it('should handle signup error', () => {
    const authData: AuthModel = {
      email: 'test@example.com',
      password: 'password123',
    };

    const co2ProfileForm = {
      // Provide the Co2 profile form data here
    };

    const mockError: AuthError = {
      message: 'Signup failed',
    };

    authService.signup(authData).subscribe(
      () => {
        fail('Expected an error response but received a success response.');
      },
      (error) => {
        expect(error.status).toBe(400);
        expect(error.error.message).toBe('Signup failed');
      },
    );

    const req = httpTestingController.expectOne(`https://localhost:7103/api/Auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockError, { status: 400, statusText: 'Bad Request' });

    httpTestingController.verify();
  });

  it('should check if the user is authenticated', () => {
    const TOKEN_KEY = 'auth_token';
    sessionStorage.setItem(TOKEN_KEY, 'auth_token');
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(true);
  });

  it('should check if the user is not authenticated', () => {
    const TOKEN_KEY = 'auth_token';
    sessionStorage.removeItem(TOKEN_KEY);
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(false);
  });

  it('should log out the user', () => {
    const TOKEN_KEY = 'test_token';
    sessionStorage.setItem(TOKEN_KEY, 'test-token');
    authService.logout();
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(false);
  });
});
