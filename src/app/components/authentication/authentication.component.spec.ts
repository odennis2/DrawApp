import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FeedbackPopupService } from 'src/app/services/feedback-popup/feedback-popup.service';
import { of } from 'rxjs';
import { AuthModel, AuthResponse } from 'src/app/models/auth-model';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from '../dash/dash.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let mockForm: FormGroup;
  let mockLoginForm: FormGroup;
  let authService: AuthenticationService;
  const routes: Routes = [
    { path: 'dashboard', component: DashComponent },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      imports: [ReactiveFormsModule, HttpClientModule, NoopAnimationsModule, RouterModule.forRoot(routes),],
      providers: [AuthenticationService, FeedbackPopupService, MatSnackBar],
    });
    authService = TestBed.inject(AuthenticationService);
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls in ngOnInit', () => {
    component.ngOnInit();

    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    expect(emailControl).toBeDefined();
    expect(passwordControl).toBeDefined();
  });

  it('should handle onLogin', () => {
    mockForm = new FormGroup({
      email: new FormControl('test@example.com'),
      password: new FormControl('password123'),
    });
    const authData: AuthModel = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockResponse: AuthResponse = {
      token: 'mock-token',
      userId: 'userId',
    };

    const authSpy = spyOn(authService, 'authenticate').and.returnValue(
      of(mockResponse),
    );
    component.onLogin(mockForm);

    expect(authSpy).toHaveBeenCalledOnceWith(authData);
  });
  it('should handle onSignup', () => {
    mockForm = new FormGroup({
      email: new FormControl('test@example.com'),
      password: new FormControl('password123'),
    });
    const authService: AuthenticationService = TestBed.inject(
      AuthenticationService,
    );
    const authData: AuthModel = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse: AuthResponse = {
      token: 'mock-token',
      userId: 'userId',
    };

    const co2Profile = {
      heatingType: undefined,
      carType: undefined,
      drivesPerWeek: undefined,
      dietType: undefined,
      yearlyFlights: undefined,
      flightLength: undefined,
    };

    const authSpy = spyOn(authService, 'signup').and.returnValue(
      of(mockResponse),
    );

    component.ngOnInit();

    component.loginForm.get('email').setValue('test@example.com');
    component.loginForm.get('password').setValue('password123');

    component.onSignup(mockForm);

    expect(authSpy).toHaveBeenCalledOnceWith(authData);
  });
});
