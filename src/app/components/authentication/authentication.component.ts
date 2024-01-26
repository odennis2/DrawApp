import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthModel } from 'src/app/models/auth-model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FeedbackPopupService } from 'src/app/services/feedback-popup/feedback-popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  constructor(
    private authService: AuthenticationService,
    private feedbackService: FeedbackPopupService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USERID_KEY = 'userId';

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  signupClicked: boolean = false;
  signupDone: boolean = false;
  loginForm: any = FormGroup;
  signupForm: any = FormGroup;


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  onLogin(form: FormGroup) {
    if (form.valid) {
      const authData: AuthModel = {
        email: form.get('email')?.value,
        password: form.get('password')?.value,
      };

      this.authService.authenticate(authData).subscribe(
        (response) => {
          sessionStorage.setItem(this.USERID_KEY, response.userId);
          sessionStorage.setItem(this.TOKEN_KEY, response.token);
          this.authService.globalUserInfo.userId = this.authService.getUserId();
        },
        (error) => {
          this.feedbackService.showFeedback(
            "Login failed, email or password doesn't exist",
          );
          console.error(error);
          return;
        },
      );
    }
  }

  onSignup(form: FormGroup) {
    console.log(form.value);
    if (form.valid) {
      const authData: AuthModel = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.feedbackService.showFeedback('Succesful signup, you can now login');
      this.authService.signup(authData).subscribe(
        (response) => {
          sessionStorage.setItem(this.USERID_KEY, response.userId);
          sessionStorage.setItem(this.TOKEN_KEY, response.token);
          this.authService.globalUserInfo.userId = this.authService.getUserId();
        },
        (error) => {
          this.feedbackService.showFeedback(
            'Something went wrong during signup',
          );
          console.log(error);
          return;
        },
      );
    } else {
      this.feedbackService.showFeedback(
        'You need to fill out all information before continuing',
      );
    }
  }
}
