import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [AuthenticationService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toEqual('LibraryDrawer');
  });

  it('should check if the user is logged in', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(component.isLoggedIn()).toBeTruthy();
  });

  it('should check if the user is not logged in', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    expect(component.isLoggedIn()).toBeFalsy();
  });
});
